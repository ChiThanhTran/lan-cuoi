using Microsoft.EntityFrameworkCore;
using Server.Entities;
using Server.Enum;

namespace Server.DB
{
    public class MyDBContext : DbContext
    {
        public MyDBContext(DbContextOptions<MyDBContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }

        public DbSet<Post> Posts { get; set; }

        public DbSet<Category> Categories { get; set; }

        public DbSet<Tag> Tags { get; set; }

        public DbSet<Comment> Comments { get; set; }

        public DbSet<ReplyComment> ReplyComments { get; set; }

        public DbSet<Safe> Safes { get; set; }

        public DbSet<LikePost> LikePosts { get; set; }

        public DbSet<LikeComment> LikeComments { get; set; }

        public DbSet<LikeReplyComment> LikeReplyComments { get; set; }

        public DbSet<TagInPost> TagInPosts {get; set;}

        protected override void OnModelCreating(ModelBuilder builder)
        {
            //User
            builder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    Name = "Thanh",
                    DateOfBirth = new DateTime(1999, 01, 12),
                    Gender = Gender.Male,
                    Type = Roles.Admin,
                    Username = "thanh123",
                    Password = "thanh321",
                    Location = "Ha Noi",
                    Email = "tranchithanh1809@gmail.com",
                    Phone = "0376959875",
                    Bio = "ToTheStar",
                    Follower = 1,
                    Following = 10,
                    Image = "https://phongreviews.com/wp-content/uploads/2022/11/avatar-facebook-mac-dinh-8.jpg",
                    BackgroundImage = "3"

                },
                new User
                {
                    Id = 2,
                    Name = "Long",
                    DateOfBirth = new DateTime(1999, 07, 12),
                    Gender = Gender.Male,
                    Type = Roles.Admin,
                    Username = "long123",
                    Password = "long321",
                    Location = "Ha Noi",
                    Email = "longkute123@gmail.com",
                    Phone = "0832536799",
                    Bio = "Kutelata",
                    Follower = 3,
                    Following = 10,
                    Image = "https://phongreviews.com/wp-content/uploads/2022/11/avatar-facebook-mac-dinh-8.jpg",
                    BackgroundImage = "4"
                },
                new User
                {
                    Id = 3,
                    Name = "Dat",
                    DateOfBirth = new DateTime(1999, 09, 09),
                    Gender = Gender.Male,
                    Type = Roles.Admin,
                    Username = "dat123",
                    Password = "dat321",
                    Location = "Ha Noi",
                    Email = "nmdat0909@gmail.com",
                    Phone = "0345613499",
                    Bio = "DatKhongChin",
                    Follower = 9,
                    Following = 9,
                    Image = "https://phongreviews.com/wp-content/uploads/2022/11/avatar-facebook-mac-dinh-8.jpg",
                    BackgroundImage = "9"
                }
            );

            //Category
            builder.Entity<Category>().HasData(
                new Category
                {
                    Id = 1,
                    CategoryName = "Thể Thao",
                    CategoryBio = "Tất cả những nội dung và trao đổi liên quan tới thể thao trong nước và quốc tế."
                },
                new Category
                {
                    Id = 2,
                    CategoryName = "Khoa học Công nghệ",
                    CategoryBio = "Những tri thức, hiểu biết có liên quan tới các phát minh, xu hướng, lý thuyết trong tất cả các lĩnh vực khoa học cơ bản, tâm lý học, triết học, công nghệ..."
                },
                new Category
                {
                    Id = 3,
                    CategoryName = "Game",
                    CategoryBio = "Review, walkthrough và phân tích game dành cho các game thủ thực thụ."
                },
                new Category
                {
                    Id = 4,
                    CategoryName = "Quan điểm tranh luận",
                    CategoryBio = "Các nội dung thể hiện góc nhìn, quan điểm đa chiều về các vấn đề kinh tế, văn hoá – xã hội trong và ngoài nước."
                },
                new Category
                {
                    Id = 5,
                    CategoryName = "Nấu ăn ẩm thực",
                    CategoryBio = "Các nội dung liên quan đến ẩm thực trong nước và quốc tế"
                },
                new Category
                {
                    Id = 6,
                    CategoryName = "Sách",
                    CategoryBio = "Tổng hợp tất cả những nội dung liên quan tới sách: review, thảo luận về nội dung sách và văn hoá đọc."
                },
                new Category
                {
                    Id = 7,
                    CategoryName = "Fitness",
                    CategoryBio = "Các nội dung về việc ăn tập giúp cho cơ thể cân đối"
                },
                new Category
                {
                    Id = 8,
                    CategoryName = "Yêu",
                    CategoryBio = "Các quan điểm về tình yêu"
                },
                new Category
                {
                    Id = 9,
                    CategoryName = "Movie",
                    CategoryBio = "Bàn, thảo luận, review đánh giá về các bộ phim và các nhân vật trên màn ảnh"
                },
                new Category
                {
                    Id = 10,
                    CategoryName = "Nhiếp ảnh",
                    CategoryBio = "Các nội dung liên quan đến bộ môn 'nghệ thuật thứ 8'"
                },
                new Category
                {
                    Id = 11,
                    CategoryName = "Điêu khắc kiến trúc mỹ thuật",
                    CategoryBio = "Bàn về các nội dung liên quan đến điêu khắc kiến trúc hội họa"
                },
                new Category
                {
                    Id = 12,
                    CategoryName = "Người trong muôn nghề",
                    CategoryBio = "Trải nghiệm về các ngành nghề trong xã hội"
                },
                new Category
                {
                    Id = 13,
                    CategoryName = "Lịch sử",
                    CategoryBio = "Bàn về các sự kiện lịch sử trong nước và quốc tế"
                },
                new Category
                {
                    Id = 14,
                    CategoryName = "Giáo dục",
                    CategoryBio = "Bàn về nghề giáo và ngành giáo dục"
                },
                new Category
                {
                    Id = 15,
                    CategoryName = "Du lịch ",
                    CategoryBio = "Trải nghiệm, review về các địa điểm du lịch"
                },
                new Category
                {
                    Id = 16,
                    CategoryName = "Phát triển bản thân",
                    CategoryBio = "Các nội dung về phát triển bản thân"
                },
                new Category
                {
                    Id = 17,
                    CategoryName = "Âm nhạc",
                    CategoryBio = "Các nội dung về bài hát, ca sĩ, nhạc sĩ trong nước và quốc tế"
                },
                new Category
                {
                    Id = 18,
                    CategoryName = "Thời trang",
                    CategoryBio = "Các nội dung về thời trang"
                },
                new Category
                {
                    Id = 19,
                    CategoryName = "Ô tô",
                    CategoryBio = "Các câu chuyện xoay quanh ô tô"
                },
                new Category
                {
                    Id = 20,
                    CategoryName = "Chuyện trò tâm sự",
                    CategoryBio = "Tâm sự, tình cảm, các mối quan hệ trong gia đình và xã hội hoặc những câu chuyện cá nhân khác bạn muốn cộng đồng lắng nghe và đưa ra lời khuyên."
                }




            );
            //Post
            builder.Entity<Post>()
                .HasOne(c => c.Category)
                .WithMany(a => a.Posts)
                .HasForeignKey(c => c.CategoryId)
                .IsRequired();

            builder.Entity<Post>()
                .HasOne(c => c.User)
                .WithMany(a => a.Posts)
                .HasForeignKey(c => c.UserId)
                .IsRequired();
            builder.Entity<Post>().HasData(
                new Post
                {
                    Id = 1,
                    PostTitle = "Chúc mừng anh, Leo Messi",
                    Specification = "Đôi lời viết cho Messi sau chức vô địch World Cup 2022",
                    PostDay = new DateTime(2023, 1, 1),
                    Description = "<p>" +
                    "<img src='https://images.spiderum.com/sp-images/95b65c307eff11eda3fdd33356c77f73.png' />" +
                    "<br />"+
                    "Khoảng hơn chục năm về trước, ký ức sâu sắc nhất về Messi trong lòng một fan MU mù quáng như tôi là cú đánh đầu vào lưới Van Der Sar tại chung kết C1 mùa 2008-2009; và một bàn thắng nữa cũng vào lưới đội bóng áo đỏ đau khổ của tôi ở chung kết C1 chỉ 2 năm sau đó. Nỗi đau từ hai bàn thua này là động lực khiến tôi chưa bao giờ cảm thấy thích Messi, dù anh có là cầu thủ xuất chúng đến thế nào." +
                    "<br />"+
                    "<img src='https://images.spiderum.com/sp-images/b33664807eff11eda3fdd33356c77f73.png' />"+
                    "<br />" +
                    "Chúng tôi gọi anh với đủ cái tên: Si lùn (vì chiều cao), Si thuế (vì drama trốn thuế) hay Sa tị (lúc anh mới về PSG và chưa đạt phong độ cao), chúng tôi hay nói đùa anh đá bóng toàn 'đi bộ vuốt râu', 'đi bộ gãi đ*t', đồng đội gánh còng lưng v.v. Chúng tôi thích Ronaldo hơn vì anh Bảy đẹp trai hơn, nỗ lực hơn, và vì anh từng là một Quỷ đỏ.<br />Tám năm trước, bức ảnh Messi thẫn thờ nhìn cúp vàng World Cup sau thất bại tại chung kết trước đội tuyển Đức là một trong những hình ảnh gây ảnh hưởng mạnh mẽ tới cái nhìn của tôi về anh. Tôi nhận ra đằng sau cầu thủ nhỏ bé với khả năng thiên tài này là những nỗ lực phi thường của một con người tử tế." +
                    "<br />" +
                    "<img src='https://images.spiderum.com/sp-images/f2d6ff507eff11eda3fdd33356c77f73.png' />" +
                    "<br />" +
                    "Messi là thiên tài, người Argentina kỳ vọng anh đem lại vinh quang cho đội tuyển. Họ từng chỉ trích anh thậm tệ vì thất bại trong nhiệm vụ này, bất chấp chuyện anh lẽ ra đã giành chức vô địch World Cup từ lâu nếu lựa chọn khoác áo Tây Ban Nha. Messi từng quyết định từ giã đội tuyển quốc gia Argentina năm 2016 sau quá nhiều thất bại đau đớn ở các trận chung kết Copa America và World Cup. Nhưng rồi anh vẫn trở lại, đơn giản vì tình yêu quá lớn với đất nước mình sinh ra." +
                    "<br />" +
                    "<img src='https://images.spiderum.com/sp-images/08a609207f0011eda3fdd33356c77f73.png' />" +
                    "<br />" +
                    "Messi là thiên tài, nhiều người xem bóng đá (như tôi khi đó) cho rằng anh chẳng phải nỗ lực nhiều để có được thành công. Chúng tôi thích những hình mẫu vươn lên bằng việc cố gắng và ý chí hơn người hơn; bất chấp việc con đường của Messi cũng chẳng bằng phẳng như thế: anh từng phải tự tiêm hormone tăng trưởng mỗi tối năm 12 tuổi, từng quyết định chọn sống xa gia đình với bố ở Barcelona để theo đuổi ước mơ chơi bóng. Với một đứa trẻ, đó không phải điều dễ dàng." +
                    "<br />" +
                    "Messi là thiên tài, người ta kỳ vọng anh phải tỏa sáng cả ở đấu trường khắc nghiệt như Ngoại hạng Anh. Thế nhưng sau rất nhiều tranh cãi, cuối cùng Messi vẫn ở lại Barca vì sau tất cả, CLB này là nơi đã tạo dựng nên tên tuổi anh. Quan trọng hơn hết, Barca chính là CLB đã chi trọn tiền tiêm hormone cho ngôi sao trẻ này khi họ chiêu mộ anh vào năm 13 tuổi, cho Messi cơ hội chơi bóng chuyên nghiệp. Messi chỉ rời Barca sang PSG khi hoàn cảnh không còn cho phép anh gắn bó với CLB được nữa" +
                    "<br />" +
                    "Chiều nay tôi vừa xem được đoạn kết clip phỏng vấn của nữ phóng viên Sofia Martinez với Messi, xin phép trích lại đoạn thích nhất:" +
                    "<br />" +
                    "'Chẳng có đứa trẻ nào không có áo đấu của các anh, không cần biết đó là hàng nhái, hàng thật hay tự làm. Anh đã để lại dấu ấn trong cuộc sống mỗi người và với tôi, điều đó còn quan trọng hơn cả chức vô địch World Cup. Không ai có thể lấy đi điều đó từ anh và đây là lòng biết ơn của tôi đối với niềm hạnh phúc to lớn mà anh đã mang đến cho rất nhiều người. Tôi thực sự hy vọng anh khắc ghi những lời này bởi tôi tin điều đó quan trọng hơn cả vô địch World Cup. Với chúng tôi, anh đã có chức vô địch đó rồi, cảm ơn đội trưởng'." +
                    "<br />" +
                    "Trước trận chung kết, tôi đã lo lắng vì không dám tin vào những câu chuyện quá hoàn hảo: trước đội tuyển Pháp quá mạnh và đồng đều, liệu Messi có một lần nữa gục ngã trước ngưỡng cửa thiên đường? Nếu anh là cầu thủ xuất sắc nhất, thậm chí đạt được Quả bóng vàng thứ 8, còn Argentina vẫn chỉ là Á quân, liệu sự tiếc nuối của Messi và những người yêu bóng đá sẽ kéo dài tới tận bao giờ? " +
                    "<br />" +
                    "May mắn là cuối cùng Messi đã có được cái kết viên mãn. Tôi thực lòng vui mừng cho anh và những người đồng đội, cho cả ước mơ của những người Argentina." +
                    "<br />" +
                    "Sẽ có những câu hỏi về việc tại sao tuyển Pháp đá dưới phong độ thời gian đầu trận, về bệnh cúm, về những bàn thắng chóng vánh của Pháp hay về đủ thứ giả thuyết liên quan tới chiến thắng này của Argentina. Nhưng có sao đâu, hôm nay cứ vui đã. Chẳng phải chúng ta vừa được chứng kiến cầu thủ xuất sắc nhất lịch sử bóng đá giành được danh hiệu cao quý cuối cùng còn thiếu trong bộ sưu tập của mình đó sao? " +
                    "</p> ",
                    Status = Status.Accepted,
                    TitleImage = "https://images.spiderum.com/sp-images/95b65c307eff11eda3fdd33356c77f73.png",
                    View = 10,
                    CategoryId = 1,
                    UserId = 1,
                },
                new Post
                {
                    Id = 2,
                    PostTitle = "Tại sao lại là đếm cừu chứ không phải đếm voi?",
                    Specification = "Liệu nếu thay đổi tên con vật, thì bạn có chìm vào giấc ngủ hay không? 1 con voi, 2 con voi, 3 con chó, 4 con gà, 5 con ngỗng",
                    PostDay = new DateTime(2023, 2, 2),
                    Description = "<p>" +
                    "<img src='https://images.spiderum.com/sp-images/3f050e90eb1511ed97a0c5995aeeedb3.jpeg' />" +
                    "<br />"+
                    "Có lẽ không ít lần nhiều người trong số chúng ta thường hay mất ngủ do một lý do nào đó. Và chúng ta đã từng nghe đến phương pháp đếm cừu để giải quyết tình trạng này." +
                    "<br />" +
                    "1 con cừu, 1 con cừu, 2 con cừu, 2 con cừu, 3 con cừu, 3 con cừu,… 10 con cừu, 10 con cừu, 11 con cừu, 11 con cừu, 12 con cừu, 12 con cừu,… 20 con cừu, 20 con cừu,… Và bạn cứ tiếp tục đếm như thế cho đến khi nào chìm vào trong giấc ngủ." +
                    "<br />" +
                    "Liệu nếu thay đổi tên con vật, thì bạn có chìm vào giấc ngủ hay không?" +
                    "<br />" +
                    "1 con voi, 2 con voi, 3 con chó, 4 con gà, 5 con ngỗng" +
                    "<br />" +
                    "Trong tiếng Anh, sheep (con cừu) gần giống với sleep (giấc ngủ). Khi bạn đếm như vậy giống như bạn đang liên tục ra lệnh cho não bộ của bạn là sleep." +
                    "<br />" +
                    "1 sheep, 2 sheep, 3 sheep, 4 sheep, 5 sheep.Sẽ đọc gần giống là 1 sleep, 2 sleep, 3 sleep, 4 sleep, 4 sleep" +
                    "<br />" +
                    "Một thực tế rõ ràng rằng là một người luôn có xu hướng tin vào bất kỳ điều gì mà họ liên tục tự nhủ với bản thân, cho dù điều đó đúng hay không đúng." +
                    "<br />" +
                    "Tuy bạn thực sự ko buồn ngủ nhưng bạ liên tục ra lệnh cho não là ngủ thì tới lúc nó sẽ tin là nó thực sự mệt và muốn ngủ" +
                    "<br />" +
                    "Những cách nghĩ cố tình gieo rắc vào tâm trí bạn, khích lệ nó, cho nó hòa trộn vào những cảm xúc của bạn sẽ kết thành các động lực định hướng và kiểm soát mọi động thái và hành vi làm việc của bạn." +
                    "<br />" +
                    "<img src='https://ken-marketing.com/wp-content/uploads/2021/08/Psycho.jpg' />" +
                    "<br />" +
                    "<b>Câu hỏi tinh tế thứ 2: Bạn có bị tự kỷ ám thị không?</b>" +
                    "<br />" +
                    "Đây sẽ là một vài dẫn chứng mà tự kỷ ám thị luôn có xuất hiện xung quanh bạn. Mà chính bạn không nhận ra trong cuộc sống." +
                    "<br />" +
                    "Ví dụ 1: Bạn luôn muốn mua một cổ phiếu giá thấp với hy vọng nó sẽ tăng cao (Bài viết đề cập đến những người chưa tìm hiểu kỹ một kiểu đầu tư nào đó)" +
                    "<br />" +
                    "Bởi vì bạn đã từng nhìn thấy nhiều trường hợp đổi đời nhờ cổ phiếuBạn nhìn thấy cổ phiếu tăng rồi giảm, giảm rồi lại tăngBạn xem phim thấy người ta mua cổ phiếu vậy qua ngày sau giá vọt gấp đôi.Bởi vì bạn thấy nhiều người thành triệu phú Bitcoin chỉ sau một đêm" +
                    "<br />" +
                    "Tất cả sự việc trên có thể làm bạn bị tự kỷ ám thị rằng lựa chọn của bạn là đúng Cho dù có những lúc cổ phiếu hay một đồng tiền ảo nào đó sẽ không bao giờ lên được nữa." +
                    "<br />" +
                    "Ví dụ 2: Sir Andrew Wiles là một thiên tài toán học, ổng mất 8 năm chỉ để giải 1 bài toán Fermat cũng là một dạng tự kỷ ám thị. Vì vậy thiên tài và nhà phát minh thường có xu hướng của tự kỷ ám thị, quá tập trung vào một vấn đề." +
                    "<br />" +
                    "Ví dụ 3: Heath Ledger - đóng vai Joker đạt như thế nào. Tuy nhiên có những diễn viên cả đời chỉ đóng được 1 vai, cho dù có đóng phim khác thì phong cách cũng y chang phim cũ, không thoát vai được vì họ vẫn không dứt được vai cũ." +
                    "<br />" +
                    "Lục Tiểu Linh Đồng cũng là một ví dụ điển hình, ngoài Tôn Ngộ Không thì các vai diễn của ông cũng toàn những vai lý lắc và sử dụng ngôn ngữ thân thể nhiều." +
                    "<br />" +
                    "<b>Câu hỏi tinh tế thứ 3: Vậy có thể lợi dụng hiệu quả bệnh tự kỷ ám thị để giúp cuộc sống ta tốt hơn không? </b>" +
                    "<br />" +
                    "Câu trả lời là có nếu mình biết sử dụng đúng cách, đúng thời điểm như phương pháp đếm cừu ở trên hoặc có niềm tin vào một sự việc nào đó thì nó là tốt." +
                    "<br />" +
                    "Còn không đúng thì một ngày nào đó bạn sẽ gặp trường hợp như những nhà đầu tư mua cổ phiếu phía trên, chờ mãi không thấy lên." +
                    "<br />" +
                    "<b>Câu hỏi tinh tế nhất:</b>" +
                    "<br />" +
                    "Cừu thì đọc gần giống như chữ Ngủ trong tiếng Anh, vậy nếu có thể chuyển qua tiếng việt thì sẽ là con gì?" +
                    "</p> ",
                    Status = Status.Accepted,
                    TitleImage = "https://images.spiderum.com/sp-images/3f050e90eb1511ed97a0c5995aeeedb3.jpeg",
                    View = 20,
                    CategoryId = 2,
                    UserId = 2,
                },
                new Post
                {
                    Id = 3,
                    PostTitle = "Review Bad North: Jotunn Edition - Tựa game Viking không mấy nổi tiếng",
                    Specification = "Trước hết để đính chính với các bạn, mình không phải một người có kinh nghiệm trong lĩnh vực phân tích hay review game. Đây chính là...",
                    PostDay = new DateTime(2023, 3, 3),
                    Description = "<p>" +
                    "Trước hết để đính chính với các bạn, mình không phải một người có kinh nghiệm trong lĩnh vực phân tích hay review game. Đây chính là bài viết đầu tiên của mình trong Spiderum, có gì sai sót mong mọi người góp ý, chân thành cảm ơn các bạn." +
                    "<br />"+
                    "-Gameplay: Bad North là một game chiến thuật thời gian thực (RTT). Game có tiết tấu khá nhanh nhưng tương đối đơn giản và dễ thích nghi, việc bạn phải làm chính là điều khiển những đơn vị nhỏ có từng chức năng do bạn quyết định (VD: Giáo, Kiếm, Cung) đến nơi chỉ định để tiêu diệt địch ở nơi chúng đổ bộ, thông qua tiêu diệt những cuộc tấn công của lũ Viking trên từng hòn đảo khác nhau để gom góp vàng nâng cấp cho những đơn vị của mình hoặc lấy những chức năng đặc biệt để gắn vào đơn vị." +
                    "<br />"+
                    " Việc lựa chọn hòn đảo cũng là một yếu tố quan trọng, mỗi hòn đảo có từng địa hình khác nhau và có số lượng nhà khác nhau, nhà tùy vào độ to nhỏ, số lượng mà quyết định đến số vàng bạn kiếm được, hãy nhớ mục tiêu phá hủy của lũ Viking là những ngôi nhà. Có rất nhiều nơi để bạn lựa chọn về sau nhưng nhớ là hãy chỉ đánh những hòn đảo cần thiết và bạn tự tin với việc sẽ khắc chế được các đơn vị Viking ở đó, vào cuối mỗi lượt sẽ có một vùng đen tiến theo từng hòn đảo đến chỗ bạn, đừng để nó đến quá gần. "+
                    "<br />"+
                    "-Đồ họa + Âm thanh: Game sở hữu đồ họa đơn giản nhưng tươi sáng và bắt mắt. Vì thế nó khá nhẹ và chạy tốt trên toàn bộ các dòng máy tính hiện hành lẫn cả điện thoại." +
                    "<br />"+
                    "<img src='https://images.spiderum.com/sp-images/d6f4fcd0174711eda5660b351c563c92.png' />" +
                    "<br />"+
                    "Nếu bạn là một người sợ máu hay không thích việc máu bắn tung tóe thì game có tính năng tắt đi máu bắn ra. " +
                    "<br />" +
                    "-Âm thanh trong game theo tôi đánh giá là tròn vai, điểm trừ à soundtrack ít, hầu như không có nhạc. Bù lại âm thanh từ môi trường và thời tiết rất chill và được đầu tư. Còn lũ lính khi đánh nhau tạo ra âm thanh khá dễ thương và buồn cười, y hệt màu sắc của game." +
                    "<br />" +
                    "-Cốt truyện: Phần này đáng nhẽ ra phải được để đầu, nhưng game rất ít tiết lộ về cốt truyện và đơn giản hóa mọi thứ. Khá khó để giải thích mục đích của game là gì, có thể bạn đang chiếm đất của lũ Viking, có thể bạn là lính đi bảo vệ những đảo hoang của người Anh trước lũ Viking. Không ai biết được, bạn có thể thử tải về chơi để rút ra cảm nhận." +
                    "<br />" +
                    "Phần này tôi sẽ điểm ra điểm tốt, điểm xấu và đánh giá điểm số trên thang điểm 10." +
                    "<br />" +
                    "-Điểm tốt: + Lối chơi thu hút và dễ làm quen." +
                    "<br />" +
                    "+ Đồ họa mượt mà và chạy tốt trên các dòng máy hiện hành." +
                    "<br />" +
                    "+ Âm thanh chill và được đầu tư" +
                    "<br />" +
                    "- Điểm xấu: + Game nhanh chán sau một thời gian" +
                    "<br />" +
                    "+ Ít khả năng tùy chỉnh trò chơi, không thể chọn mức độ đồ họa." +
                    "<br />" +
                    "+ Thiếu chỉ dẫn rõ ràng khi chơi." +
                    "<br />" +
                    "+ Phím bấm chưa được linh hoạt." +
                    "<br />" +
                    "Tóm lại, Bad North là một tựa game đáng chơi. Tôi đánh giá nó 7 điểm trên 10." +
                    "</p> ",
                    Status = Status.Accepted,
                    TitleImage = "https://images.spiderum.com/sp-images/d6f4fcd0174711eda5660b351c563c92.png",
                    View = 3000,
                    CategoryId = 3,
                    UserId = 3,
                }

            );
            //Tag
            builder.Entity<Tag>().HasData(
                new Tag
                {
                    Id = 1,
                    TagName = "Bóng Đá",
                },
                new Tag
                {
                    Id = 2,
                    TagName = "Giấc mơ",
                },
                new Tag
                {
                    Id = 3,
                    TagName = "Real-time strategy",
                }
            );
            //TagInPost
            builder.Entity<TagInPost>()
                .HasOne(c => c.Tag)
                .WithMany(a => a.TagInPosts)
                .HasForeignKey(c => c.TagId)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();

            builder.Entity<TagInPost>()
                .HasOne(c => c.Post)
                .WithMany(a => a.TagInPosts)
                .HasForeignKey(c => c.PostId)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();
            builder.Entity<TagInPost>().HasData(
                new TagInPost
                {
                    TagId = 1,
                    PostId = 1,
                    TagName = "Bóng Đá",
                    PostTitle = "Chúc mừng anh, Leo Messi",
                    Specification = "Đôi lời viết cho Messi sau chức vô địch World Cup 2022",
                    TitleImage = "https://images.spiderum.com/sp-images/95b65c307eff11eda3fdd33356c77f73.png",
                    CategoryId = 1,

                },
                new TagInPost
                {
                    TagId = 2,
                    PostId = 2,
                    TagName = "Giấc mơ",
                    PostTitle = "Tại sao lại là đếm cừu chứ không phải đếm voi?",
                    Specification = "Liệu nếu thay đổi tên con vật, thì bạn có chìm vào giấc ngủ hay không? 1 con voi, 2 con voi, 3 con chó, 4 con gà, 5 con ngỗng",
                    TitleImage = "https://images.spiderum.com/sp-images/3f050e90eb1511ed97a0c5995aeeedb3.jpeg",
                    CategoryId = 2,
                },
                new TagInPost
                {
                    TagId = 3,
                    PostId = 3,
                    TagName = "Real-time strategy",
                    PostTitle = "Review Bad North: Jotunn Edition - Tựa game Viking không mấy nổi tiếng",
                    Specification = "Trước hết để đính chính với các bạn, mình không phải một người có kinh nghiệm trong lĩnh vực phân tích hay review game. Đây chính là...",
                    TitleImage = "https://images.spiderum.com/sp-images/d6f4fcd0174711eda5660b351c563c92.png",
                    CategoryId = 3,
                }
            );
            //Comment
            builder.Entity<Comment>()
                .HasOne(c => c.Post)
                .WithMany(a => a.Comments)
                .HasForeignKey(c => c.PostId)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();

            builder.Entity<Comment>()
                .HasOne(c => c.User)
                .WithMany(a => a.Comments)
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();
            builder.Entity<Comment>().HasData(
                new Comment
                {
                    Id = 1,
                    UserId = 1,
                    Name = "Thanh",
                    Image = "https://phongreviews.com/wp-content/uploads/2022/11/avatar-facebook-mac-dinh-8.jpg",
                    PostId = 1,
                    Text = "Bai viet hay",
                    CreateAt = new DateTime(2023, 1, 2),
                },
                new Comment
                {
                    Id = 2,
                    UserId = 2,
                    Name ="Long",
                    Image = "https://phongreviews.com/wp-content/uploads/2022/11/avatar-facebook-mac-dinh-8.jpg",
                    PostId = 2,
                    Text = "Bai viet k hay",
                    CreateAt = new DateTime(2023, 2, 3),
                },
                new Comment
                {
                    Id = 3,
                    UserId = 3,
                    Name ="Dat",
                    Image = "https://phongreviews.com/wp-content/uploads/2022/11/avatar-facebook-mac-dinh-8.jpg",
                    PostId = 3,
                    Text = "Bai viet rat hay",
                    CreateAt = new DateTime(2023, 3, 4),
                }
            );
            //ReplyComment
            builder.Entity<ReplyComment>()
                .HasOne(c => c.Comment)
                .WithMany(a => a.ReplyComments)
                .HasForeignKey(c => c.CommentId)
                .IsRequired();

            builder.Entity<ReplyComment>()
                .HasOne(c => c.User)
                .WithMany(a => a.ReplyComments)
                .HasForeignKey(c => c.UserId)
                .IsRequired();
            builder.Entity<ReplyComment>().HasData(
                new ReplyComment
                {
                    Id = 1,
                    UserId = 1,
                    Name ="Thanh",
                    Image = "https://phongreviews.com/wp-content/uploads/2022/11/avatar-facebook-mac-dinh-8.jpg",
                    CommentId = 1,
                    Text = "toi dong y",
                    CreateAt = new DateTime(2023, 1, 3),
                },
                new ReplyComment
                {
                    Id = 2,
                    UserId = 2,
                    Name ="Long",
                    Image = "https://phongreviews.com/wp-content/uploads/2022/11/avatar-facebook-mac-dinh-8.jpg",
                    CommentId = 2,
                    Text = "dung vay",
                    CreateAt = new DateTime(2023, 2, 4),
                },
                new ReplyComment
                {
                    Id = 3,
                    UserId = 3,
                    Name ="Dat",
                    Image = "https://phongreviews.com/wp-content/uploads/2022/11/avatar-facebook-mac-dinh-8.jpg",
                    CommentId = 3,
                    Text = "chuan",
                    CreateAt = new DateTime(2023, 3, 5),
                }
            );
            //Safe
            builder.Entity<Safe>().HasAlternateKey(c => c.Id);
            builder.Entity<Safe>()
                .HasOne(c => c.Post)
                .WithMany(a => a.Safes)
                .HasForeignKey(c => c.PostId)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();

            builder.Entity<Safe>()
                .HasOne(c => c.User)
                .WithMany(a => a.Safes)
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();
            builder.Entity<Safe>().HasData(
                new Safe
                {
                    UserId = 1,
                    PostId = 1,
                    IsSafe = ESafe.Yes,

                },
                new Safe
                {
                    UserId = 2,
                    PostId = 2,
                    IsSafe = ESafe.Yes,
                },
                new Safe
                {
                    UserId = 3,
                    PostId = 3,
                    IsSafe = ESafe.Yes,
                }
            );
            //LikePost
            builder.Entity<LikePost>().HasAlternateKey(c => c.Id);
            builder.Entity<LikePost>()
                .HasOne(c => c.Post)
                .WithMany(a => a.LikePosts)
                .HasForeignKey(c => c.PostId)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();

            builder.Entity<LikePost>()
                .HasOne(c => c.User)
                .WithMany(a => a.LikePosts)
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();
            builder.Entity<LikePost>().HasData(
                new LikePost
                {
                    UserId = 1,
                    PostId = 1,
                    IsLikePost = ELikePost.Yes,

                },
                new LikePost
                {
                    UserId = 2,
                    PostId = 2,
                    IsLikePost = ELikePost.Yes,
                },
                new LikePost
                {
                    UserId = 3,
                    PostId = 3,
                    IsLikePost = ELikePost.Yes,
                }
            );
            //LikeComment
            builder.Entity<LikeComment>().HasAlternateKey(c => c.Id);
            builder.Entity<LikeComment>()
                .HasOne(c => c.Comment)
                .WithMany(a => a.LikeComments)
                .HasForeignKey(c => c.CommentId)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();

            builder.Entity<LikeComment>()
                .HasOne(c => c.User)
                .WithMany(a => a.LikeComments)
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();
            builder.Entity<LikeComment>().HasData(
                new LikeComment
                {
                    UserId = 1,
                    CommentId = 1,
                    IsLikeComment = ELikeComment.Yes,

                },
                new LikeComment
                {
                    UserId = 2,
                    CommentId = 2,
                    IsLikeComment = ELikeComment.Yes,
                },
                new LikeComment
                {
                    UserId = 3,
                    CommentId = 3,
                    IsLikeComment = ELikeComment.Yes,
                }
            );
            //LikeReplyComment
            builder.Entity<LikeReplyComment>().HasAlternateKey(c => c.Id);
            builder.Entity<LikeReplyComment>()
                .HasOne(c => c.ReplyComment)
                .WithMany(a => a.LikeReplyComments)
                .HasForeignKey(c => c.ReplyCommentId)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();

            builder.Entity<LikeReplyComment>()
                .HasOne(c => c.User)
                .WithMany(a => a.LikeReplyComments)
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();
            builder.Entity<LikeReplyComment>().HasData(
                new LikeReplyComment
                {
                    UserId = 1,
                    ReplyCommentId = 1,
                    IsLikeReplyComment = ELikeReplyComment.Yes,

                },
                new LikeReplyComment
                {
                    UserId = 2,
                    ReplyCommentId = 2,
                    IsLikeReplyComment = ELikeReplyComment.Yes,
                },
                new LikeReplyComment
                {
                    UserId = 3,
                    ReplyCommentId = 3,
                    IsLikeReplyComment = ELikeReplyComment.Yes,
                }
            );




        }
    }
}