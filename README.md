# Real-Time Chat Application

Bu proje, kullanıcıların farklı sohbet odalarında gerçek zamanlı mesajlaşma yapmasını sağlar. Proje **SignalR**, **React** ve **.NET Core** kullanılarak geliştirilmiştir.

## Başlangıç

Projenin çalıştırılması için aşağıdaki adımları izleyin.

### Gereksinimler
- **Node.js** (v16 veya üzeri)
- **.NET SDK** (v6.0 veya üzeri)
- **npm**
- **MongoDB** (Yerel veya Atlas kullanabilirsiniz)

### Kurulum
1. Bu projeyi klonlayın:
   ```bash
   git clone https://github.com/username/RealTimeChatApp.git
   cd RealTimeChatApp
## MongoDB Bağlantı Dizisi Oluşturma ve Projede Kullanımı

1. **MongoDB Bağlantı Dizisini Oluşturma:**
   - Eğer **MongoDB Atlas** kullanıyorsanız:
     1. [MongoDB Atlas](https://www.mongodb.com/atlas) web sitesine gidin ve hesabınıza giriş yapın.
     2. Yeni bir Cluster oluşturun.
     3. Cluster ayarlarından "Connect" butonuna tıklayın.
     4. "Connect Your Application" seçeneğini seçin.
     5. Aşağıdaki gibi bir bağlantı dizisi oluşturun (örnek):
        ```
        mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
        ```
   - Eğer **yerel MongoDB** kullanıyorsanız:
     1. MongoDB'nin kurulu olduğundan emin olun.
     2. Yerel bağlantı dizisi genelde şu şekildedir:
        ```
        mongodb://localhost:27017/<dbname>
        ```
2. **Bağlantı Dizisini Projeye Yazma:**
   - **Backend** dizinindeki `appsettings.json` dosyasını açın.
   - Aşağıdaki yapılandırmayı ekleyin veya düzenleyin:
     ```json
     {
       "ConnectionStrings": {
         "MongoDb": "mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority"
       }
     }
     ```
   - `<username>`, `<password>` ve `<dbname>` alanlarını kendi bilgilerinizle doldurun.

### Projeyi başlatma

-cd chatservice
-dotnet restore
-dotnet build
-dotnet run
---------------------
-cd chatfe
-npm install
-npm run dev
