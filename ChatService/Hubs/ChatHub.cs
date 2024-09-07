using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;
using System.Threading.Tasks;
using ChatService.Models;
using ChatService.DataService;

namespace ChatService.Hubs
{
    public class ChatHub : Hub
    {
        private readonly SharedDb _sharedDb;

        public ChatHub(SharedDb sharedDb)
        {
            _sharedDb = sharedDb;
        }

        public async Task JoinSpecificChatRoom(UserConnection userConnection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.ChatRoom);

            // Store user connection
            _sharedDb.Connections[Context.ConnectionId] = userConnection;

            // Send message history to the user
            if (_sharedDb.Messages.TryGetValue(userConnection.ChatRoom, out var messageQueue))
            {
                foreach (var (user, message, timestamp) in messageQueue)
                {
                    await Clients.Caller.SendAsync("ReceiveSpecificMessage", user, message, timestamp);
                }
            }

            await Clients.Group(userConnection.ChatRoom).SendAsync("JoinSpecificChatRoom", userConnection.Username, $"{userConnection.Username} has joined the chat.");
        }

        public async Task LeaveSpecificChatRoom(UserConnection userConnection)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, userConnection.ChatRoom);

            // Remove user connection
            _sharedDb.Connections.TryRemove(Context.ConnectionId, out _);

            await Clients.Group(userConnection.ChatRoom).SendAsync("ReceiveSpecificMessage", userConnection.Username, $"{userConnection.Username} has left the chat.", DateTime.Now);
        }

        public async Task SendMessage(string message)
        {
            if (_sharedDb.Connections.TryGetValue(Context.ConnectionId, out var userConnection))
            {
                var timestamp = DateTime.Now;
                var chatMessage = (userConnection.Username, message, timestamp);

                _sharedDb.Messages.AddOrUpdate(userConnection.ChatRoom,
                    new ConcurrentQueue<(string, string, DateTime)>(new[] { chatMessage }),
                    (key, queue) =>
                    {
                        queue.Enqueue(chatMessage);
                        return queue;
                    });

                await Clients.Group(userConnection.ChatRoom).SendAsync("ReceiveSpecificMessage", userConnection.Username, message, timestamp);
            }
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            if (_sharedDb.Connections.TryRemove(Context.ConnectionId, out var userConnection))
            {
                await Clients.Group(userConnection.ChatRoom).SendAsync("ReceiveSpecificMessage", userConnection.Username, $"{userConnection.Username} has left the chat.", DateTime.Now);
            }

            await base.OnDisconnectedAsync(exception);
        }
    }
}
