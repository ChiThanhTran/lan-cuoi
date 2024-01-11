using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Category",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CategoryName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CategoryBio = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Category", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Tag",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TagName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tag", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Gender = table.Column<int>(type: "int", nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Bio = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Location = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Follower = table.Column<int>(type: "int", nullable: false),
                    Following = table.Column<int>(type: "int", nullable: false),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BackgroundImage = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Post",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PostTitle = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PostDay = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Specification = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CategoryId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    TitleImage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    View = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Post", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Post_Category_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Category",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Post_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Comment",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PostId = table.Column<int>(type: "int", nullable: false),
                    Text = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreateAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comment", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Comment_Post_PostId",
                        column: x => x.PostId,
                        principalTable: "Post",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Comment_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "LikePost",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    PostId = table.Column<int>(type: "int", nullable: false),
                    IsLikePost = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LikePost", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LikePost_Post_PostId",
                        column: x => x.PostId,
                        principalTable: "Post",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_LikePost_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Safe",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    PostId = table.Column<int>(type: "int", nullable: false),
                    IsSafe = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Safe", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Safe_Post_PostId",
                        column: x => x.PostId,
                        principalTable: "Post",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Safe_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TagInPost",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TagId = table.Column<int>(type: "int", nullable: false),
                    PostId = table.Column<int>(type: "int", nullable: false),
                    TagName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PostTitle = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Specification = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CategoryId = table.Column<int>(type: "int", nullable: false),
                    TitleImage = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TagInPost", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TagInPost_Post_PostId",
                        column: x => x.PostId,
                        principalTable: "Post",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TagInPost_Tag_TagId",
                        column: x => x.TagId,
                        principalTable: "Tag",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "LikeComment",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    CommentId = table.Column<int>(type: "int", nullable: false),
                    IsLikeComment = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LikeComment", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LikeComment_Comment_CommentId",
                        column: x => x.CommentId,
                        principalTable: "Comment",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_LikeComment_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ReplyComment",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CommentId = table.Column<int>(type: "int", nullable: false),
                    Text = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreateAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReplyComment", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ReplyComment_Comment_CommentId",
                        column: x => x.CommentId,
                        principalTable: "Comment",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ReplyComment_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "LikeReplyComment",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ReplyCommentId = table.Column<int>(type: "int", nullable: false),
                    IsLikeReplyComment = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LikeReplyComment", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LikeReplyComment_ReplyComment_ReplyCommentId",
                        column: x => x.ReplyCommentId,
                        principalTable: "ReplyComment",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_LikeReplyComment_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Category",
                columns: new[] { "Id", "CategoryBio", "CategoryName" },
                values: new object[,]
                {
                    { 1, "Tất cả những nội dung và trao đổi liên quan tới thể thao trong nước và quốc tế.", "Thể Thao" },
                    { 2, "Những tri thức, hiểu biết có liên quan tới các phát minh, xu hướng, lý thuyết trong tất cả các lĩnh vực khoa học cơ bản, tâm lý học, triết học, công nghệ...", "Khoa học Công nghệ" },
                    { 3, "Review, walkthrough và phân tích game dành cho các game thủ thực thụ.", "Game" },
                    { 4, "Các nội dung thể hiện góc nhìn, quan điểm đa chiều về các vấn đề kinh tế, văn hoá – xã hội trong và ngoài nước.", "Quan điểm tranh luận" },
                    { 5, "Các nội dung liên quan đến ẩm thực trong nước và quốc tế", "Nấu ăn ẩm thực" },
                    { 6, "Tổng hợp tất cả những nội dung liên quan tới sách: review, thảo luận về nội dung sách và văn hoá đọc.", "Sách" },
                    { 7, "Các nội dung về việc ăn tập giúp cho cơ thể cân đối", "Fitness" },
                    { 8, "Các quan điểm về tình yêu", "Yêu" },
                    { 9, "Bàn, thảo luận, review đánh giá về các bộ phim và các nhân vật trên màn ảnh", "Movie" },
                    { 10, "Các nội dung liên quan đến bộ môn 'nghệ thuật thứ 8'", "Nhiếp ảnh" },
                    { 11, "Bàn về các nội dung liên quan đến điêu khắc kiến trúc hội họa", "Điêu khắc kiến trúc mỹ thuật" },
                    { 12, "Trải nghiệm về các ngành nghề trong xã hội", "Người trong muôn nghề" },
                    { 13, "Bàn về các sự kiện lịch sử trong nước và quốc tế", "Lịch sử" },
                    { 14, "Bàn về nghề giáo và ngành giáo dục", "Giáo dục" },
                    { 15, "Trải nghiệm, review về các địa điểm du lịch", "Du lịch " },
                    { 16, "Các nội dung về phát triển bản thân", "Phát triển bản thân" },
                    { 17, "Các nội dung về bài hát, ca sĩ, nhạc sĩ trong nước và quốc tế", "Âm nhạc" },
                    { 18, "Các nội dung về thời trang", "Thời trang" },
                    { 19, "Các câu chuyện xoay quanh ô tô", "Ô tô" },
                    { 20, "Tâm sự, tình cảm, các mối quan hệ trong gia đình và xã hội hoặc những câu chuyện cá nhân khác bạn muốn cộng đồng lắng nghe và đưa ra lời khuyên.", "Chuyện trò tâm sự" }
                });

            migrationBuilder.InsertData(
                table: "Tag",
                columns: new[] { "Id", "TagName" },
                values: new object[,]
                {
                    { 1, "Bóng Đá" },
                    { 2, "Giấc mơ" },
                    { 3, "Real-time strategy" }
                });

            migrationBuilder.InsertData(
                table: "User",
                columns: new[] { "Id", "BackgroundImage", "Bio", "DateOfBirth", "Email", "Follower", "Following", "Gender", "Image", "Location", "Name", "Password", "Phone", "Type", "Username" },
                values: new object[,]
                {
                    { 1, "3", "ToTheStar", new DateTime(1999, 1, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), "tranchithanh1809@gmail.com", 1, 10, 0, "https://phongreviews.com/wp-content/uploads/2022/11/avatar-facebook-mac-dinh-8.jpg", "Ha Noi", "Thanh", "thanh321", "0376959875", 0, "thanh123" },
                    { 2, "4", "Kutelata", new DateTime(1999, 7, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), "longkute123@gmail.com", 3, 10, 0, "https://phongreviews.com/wp-content/uploads/2022/11/avatar-facebook-mac-dinh-8.jpg", "Ha Noi", "Long", "long321", "0832536799", 0, "long123" },
                    { 3, "9", "DatKhongChin", new DateTime(1999, 9, 9, 0, 0, 0, 0, DateTimeKind.Unspecified), "nmdat0909@gmail.com", 9, 9, 0, "https://phongreviews.com/wp-content/uploads/2022/11/avatar-facebook-mac-dinh-8.jpg", "Ha Noi", "Dat", "dat321", "0345613499", 0, "dat123" }
                });

            migrationBuilder.InsertData(
                table: "Post",
                columns: new[] { "Id", "CategoryId", "Description", "PostDay", "PostTitle", "Specification", "Status", "TitleImage", "UserId", "View" },
                values: new object[] { 1, 1, "<p><img src='https://images.spiderum.com/sp-images/95b65c307eff11eda3fdd33356c77f73.png' /><br />Khoảng hơn chục năm về trước, ký ức sâu sắc nhất về Messi trong lòng một fan MU mù quáng như tôi là cú đánh đầu vào lưới Van Der Sar tại chung kết C1 mùa 2008-2009; và một bàn thắng nữa cũng vào lưới đội bóng áo đỏ đau khổ của tôi ở chung kết C1 chỉ 2 năm sau đó. Nỗi đau từ hai bàn thua này là động lực khiến tôi chưa bao giờ cảm thấy thích Messi, dù anh có là cầu thủ xuất chúng đến thế nào.<br /><img src='https://images.spiderum.com/sp-images/b33664807eff11eda3fdd33356c77f73.png' /><br />Chúng tôi gọi anh với đủ cái tên: Si lùn (vì chiều cao), Si thuế (vì drama trốn thuế) hay Sa tị (lúc anh mới về PSG và chưa đạt phong độ cao), chúng tôi hay nói đùa anh đá bóng toàn 'đi bộ vuốt râu', 'đi bộ gãi đ*t', đồng đội gánh còng lưng v.v. Chúng tôi thích Ronaldo hơn vì anh Bảy đẹp trai hơn, nỗ lực hơn, và vì anh từng là một Quỷ đỏ.<br />Tám năm trước, bức ảnh Messi thẫn thờ nhìn cúp vàng World Cup sau thất bại tại chung kết trước đội tuyển Đức là một trong những hình ảnh gây ảnh hưởng mạnh mẽ tới cái nhìn của tôi về anh. Tôi nhận ra đằng sau cầu thủ nhỏ bé với khả năng thiên tài này là những nỗ lực phi thường của một con người tử tế.<br /><img src='https://images.spiderum.com/sp-images/f2d6ff507eff11eda3fdd33356c77f73.png' /><br />Messi là thiên tài, người Argentina kỳ vọng anh đem lại vinh quang cho đội tuyển. Họ từng chỉ trích anh thậm tệ vì thất bại trong nhiệm vụ này, bất chấp chuyện anh lẽ ra đã giành chức vô địch World Cup từ lâu nếu lựa chọn khoác áo Tây Ban Nha. Messi từng quyết định từ giã đội tuyển quốc gia Argentina năm 2016 sau quá nhiều thất bại đau đớn ở các trận chung kết Copa America và World Cup. Nhưng rồi anh vẫn trở lại, đơn giản vì tình yêu quá lớn với đất nước mình sinh ra.<br /><img src='https://images.spiderum.com/sp-images/08a609207f0011eda3fdd33356c77f73.png' /><br />Messi là thiên tài, nhiều người xem bóng đá (như tôi khi đó) cho rằng anh chẳng phải nỗ lực nhiều để có được thành công. Chúng tôi thích những hình mẫu vươn lên bằng việc cố gắng và ý chí hơn người hơn; bất chấp việc con đường của Messi cũng chẳng bằng phẳng như thế: anh từng phải tự tiêm hormone tăng trưởng mỗi tối năm 12 tuổi, từng quyết định chọn sống xa gia đình với bố ở Barcelona để theo đuổi ước mơ chơi bóng. Với một đứa trẻ, đó không phải điều dễ dàng.<br />Messi là thiên tài, người ta kỳ vọng anh phải tỏa sáng cả ở đấu trường khắc nghiệt như Ngoại hạng Anh. Thế nhưng sau rất nhiều tranh cãi, cuối cùng Messi vẫn ở lại Barca vì sau tất cả, CLB này là nơi đã tạo dựng nên tên tuổi anh. Quan trọng hơn hết, Barca chính là CLB đã chi trọn tiền tiêm hormone cho ngôi sao trẻ này khi họ chiêu mộ anh vào năm 13 tuổi, cho Messi cơ hội chơi bóng chuyên nghiệp. Messi chỉ rời Barca sang PSG khi hoàn cảnh không còn cho phép anh gắn bó với CLB được nữa<br />Chiều nay tôi vừa xem được đoạn kết clip phỏng vấn của nữ phóng viên Sofia Martinez với Messi, xin phép trích lại đoạn thích nhất:<br />'Chẳng có đứa trẻ nào không có áo đấu của các anh, không cần biết đó là hàng nhái, hàng thật hay tự làm. Anh đã để lại dấu ấn trong cuộc sống mỗi người và với tôi, điều đó còn quan trọng hơn cả chức vô địch World Cup. Không ai có thể lấy đi điều đó từ anh và đây là lòng biết ơn của tôi đối với niềm hạnh phúc to lớn mà anh đã mang đến cho rất nhiều người. Tôi thực sự hy vọng anh khắc ghi những lời này bởi tôi tin điều đó quan trọng hơn cả vô địch World Cup. Với chúng tôi, anh đã có chức vô địch đó rồi, cảm ơn đội trưởng'.<br />Trước trận chung kết, tôi đã lo lắng vì không dám tin vào những câu chuyện quá hoàn hảo: trước đội tuyển Pháp quá mạnh và đồng đều, liệu Messi có một lần nữa gục ngã trước ngưỡng cửa thiên đường? Nếu anh là cầu thủ xuất sắc nhất, thậm chí đạt được Quả bóng vàng thứ 8, còn Argentina vẫn chỉ là Á quân, liệu sự tiếc nuối của Messi và những người yêu bóng đá sẽ kéo dài tới tận bao giờ? <br />May mắn là cuối cùng Messi đã có được cái kết viên mãn. Tôi thực lòng vui mừng cho anh và những người đồng đội, cho cả ước mơ của những người Argentina.<br />Sẽ có những câu hỏi về việc tại sao tuyển Pháp đá dưới phong độ thời gian đầu trận, về bệnh cúm, về những bàn thắng chóng vánh của Pháp hay về đủ thứ giả thuyết liên quan tới chiến thắng này của Argentina. Nhưng có sao đâu, hôm nay cứ vui đã. Chẳng phải chúng ta vừa được chứng kiến cầu thủ xuất sắc nhất lịch sử bóng đá giành được danh hiệu cao quý cuối cùng còn thiếu trong bộ sưu tập của mình đó sao? </p> ", new DateTime(2023, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Chúc mừng anh, Leo Messi", "Đôi lời viết cho Messi sau chức vô địch World Cup 2022", 0, "https://images.spiderum.com/sp-images/95b65c307eff11eda3fdd33356c77f73.png", 1, 10 });

            migrationBuilder.InsertData(
                table: "Post",
                columns: new[] { "Id", "CategoryId", "Description", "PostDay", "PostTitle", "Specification", "Status", "TitleImage", "UserId", "View" },
                values: new object[] { 2, 2, "<p><img src='https://images.spiderum.com/sp-images/3f050e90eb1511ed97a0c5995aeeedb3.jpeg' /><br />Có lẽ không ít lần nhiều người trong số chúng ta thường hay mất ngủ do một lý do nào đó. Và chúng ta đã từng nghe đến phương pháp đếm cừu để giải quyết tình trạng này.<br />1 con cừu, 1 con cừu, 2 con cừu, 2 con cừu, 3 con cừu, 3 con cừu,… 10 con cừu, 10 con cừu, 11 con cừu, 11 con cừu, 12 con cừu, 12 con cừu,… 20 con cừu, 20 con cừu,… Và bạn cứ tiếp tục đếm như thế cho đến khi nào chìm vào trong giấc ngủ.<br />Liệu nếu thay đổi tên con vật, thì bạn có chìm vào giấc ngủ hay không?<br />1 con voi, 2 con voi, 3 con chó, 4 con gà, 5 con ngỗng<br />Trong tiếng Anh, sheep (con cừu) gần giống với sleep (giấc ngủ). Khi bạn đếm như vậy giống như bạn đang liên tục ra lệnh cho não bộ của bạn là sleep.<br />1 sheep, 2 sheep, 3 sheep, 4 sheep, 5 sheep.Sẽ đọc gần giống là 1 sleep, 2 sleep, 3 sleep, 4 sleep, 4 sleep<br />Một thực tế rõ ràng rằng là một người luôn có xu hướng tin vào bất kỳ điều gì mà họ liên tục tự nhủ với bản thân, cho dù điều đó đúng hay không đúng.<br />Tuy bạn thực sự ko buồn ngủ nhưng bạ liên tục ra lệnh cho não là ngủ thì tới lúc nó sẽ tin là nó thực sự mệt và muốn ngủ<br />Những cách nghĩ cố tình gieo rắc vào tâm trí bạn, khích lệ nó, cho nó hòa trộn vào những cảm xúc của bạn sẽ kết thành các động lực định hướng và kiểm soát mọi động thái và hành vi làm việc của bạn.<br /><img src='https://ken-marketing.com/wp-content/uploads/2021/08/Psycho.jpg' /><br /><b>Câu hỏi tinh tế thứ 2: Bạn có bị tự kỷ ám thị không?</b><br />Đây sẽ là một vài dẫn chứng mà tự kỷ ám thị luôn có xuất hiện xung quanh bạn. Mà chính bạn không nhận ra trong cuộc sống.<br />Ví dụ 1: Bạn luôn muốn mua một cổ phiếu giá thấp với hy vọng nó sẽ tăng cao (Bài viết đề cập đến những người chưa tìm hiểu kỹ một kiểu đầu tư nào đó)<br />Bởi vì bạn đã từng nhìn thấy nhiều trường hợp đổi đời nhờ cổ phiếuBạn nhìn thấy cổ phiếu tăng rồi giảm, giảm rồi lại tăngBạn xem phim thấy người ta mua cổ phiếu vậy qua ngày sau giá vọt gấp đôi.Bởi vì bạn thấy nhiều người thành triệu phú Bitcoin chỉ sau một đêm<br />Tất cả sự việc trên có thể làm bạn bị tự kỷ ám thị rằng lựa chọn của bạn là đúng Cho dù có những lúc cổ phiếu hay một đồng tiền ảo nào đó sẽ không bao giờ lên được nữa.<br />Ví dụ 2: Sir Andrew Wiles là một thiên tài toán học, ổng mất 8 năm chỉ để giải 1 bài toán Fermat cũng là một dạng tự kỷ ám thị. Vì vậy thiên tài và nhà phát minh thường có xu hướng của tự kỷ ám thị, quá tập trung vào một vấn đề.<br />Ví dụ 3: Heath Ledger - đóng vai Joker đạt như thế nào. Tuy nhiên có những diễn viên cả đời chỉ đóng được 1 vai, cho dù có đóng phim khác thì phong cách cũng y chang phim cũ, không thoát vai được vì họ vẫn không dứt được vai cũ.<br />Lục Tiểu Linh Đồng cũng là một ví dụ điển hình, ngoài Tôn Ngộ Không thì các vai diễn của ông cũng toàn những vai lý lắc và sử dụng ngôn ngữ thân thể nhiều.<br /><b>Câu hỏi tinh tế thứ 3: Vậy có thể lợi dụng hiệu quả bệnh tự kỷ ám thị để giúp cuộc sống ta tốt hơn không? </b><br />Câu trả lời là có nếu mình biết sử dụng đúng cách, đúng thời điểm như phương pháp đếm cừu ở trên hoặc có niềm tin vào một sự việc nào đó thì nó là tốt.<br />Còn không đúng thì một ngày nào đó bạn sẽ gặp trường hợp như những nhà đầu tư mua cổ phiếu phía trên, chờ mãi không thấy lên.<br /><b>Câu hỏi tinh tế nhất:</b><br />Cừu thì đọc gần giống như chữ Ngủ trong tiếng Anh, vậy nếu có thể chuyển qua tiếng việt thì sẽ là con gì?</p> ", new DateTime(2023, 2, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), "Tại sao lại là đếm cừu chứ không phải đếm voi?", "Liệu nếu thay đổi tên con vật, thì bạn có chìm vào giấc ngủ hay không? 1 con voi, 2 con voi, 3 con chó, 4 con gà, 5 con ngỗng", 0, "https://images.spiderum.com/sp-images/3f050e90eb1511ed97a0c5995aeeedb3.jpeg", 2, 20 });

            migrationBuilder.InsertData(
                table: "Post",
                columns: new[] { "Id", "CategoryId", "Description", "PostDay", "PostTitle", "Specification", "Status", "TitleImage", "UserId", "View" },
                values: new object[] { 3, 3, "<p>Trước hết để đính chính với các bạn, mình không phải một người có kinh nghiệm trong lĩnh vực phân tích hay review game. Đây chính là bài viết đầu tiên của mình trong Spiderum, có gì sai sót mong mọi người góp ý, chân thành cảm ơn các bạn.<br />-Gameplay: Bad North là một game chiến thuật thời gian thực (RTT). Game có tiết tấu khá nhanh nhưng tương đối đơn giản và dễ thích nghi, việc bạn phải làm chính là điều khiển những đơn vị nhỏ có từng chức năng do bạn quyết định (VD: Giáo, Kiếm, Cung) đến nơi chỉ định để tiêu diệt địch ở nơi chúng đổ bộ, thông qua tiêu diệt những cuộc tấn công của lũ Viking trên từng hòn đảo khác nhau để gom góp vàng nâng cấp cho những đơn vị của mình hoặc lấy những chức năng đặc biệt để gắn vào đơn vị.<br /> Việc lựa chọn hòn đảo cũng là một yếu tố quan trọng, mỗi hòn đảo có từng địa hình khác nhau và có số lượng nhà khác nhau, nhà tùy vào độ to nhỏ, số lượng mà quyết định đến số vàng bạn kiếm được, hãy nhớ mục tiêu phá hủy của lũ Viking là những ngôi nhà. Có rất nhiều nơi để bạn lựa chọn về sau nhưng nhớ là hãy chỉ đánh những hòn đảo cần thiết và bạn tự tin với việc sẽ khắc chế được các đơn vị Viking ở đó, vào cuối mỗi lượt sẽ có một vùng đen tiến theo từng hòn đảo đến chỗ bạn, đừng để nó đến quá gần. <br />-Đồ họa + Âm thanh: Game sở hữu đồ họa đơn giản nhưng tươi sáng và bắt mắt. Vì thế nó khá nhẹ và chạy tốt trên toàn bộ các dòng máy tính hiện hành lẫn cả điện thoại.<br /><img src='https://images.spiderum.com/sp-images/d6f4fcd0174711eda5660b351c563c92.png' /><br />Nếu bạn là một người sợ máu hay không thích việc máu bắn tung tóe thì game có tính năng tắt đi máu bắn ra. <br />-Âm thanh trong game theo tôi đánh giá là tròn vai, điểm trừ à soundtrack ít, hầu như không có nhạc. Bù lại âm thanh từ môi trường và thời tiết rất chill và được đầu tư. Còn lũ lính khi đánh nhau tạo ra âm thanh khá dễ thương và buồn cười, y hệt màu sắc của game.<br />-Cốt truyện: Phần này đáng nhẽ ra phải được để đầu, nhưng game rất ít tiết lộ về cốt truyện và đơn giản hóa mọi thứ. Khá khó để giải thích mục đích của game là gì, có thể bạn đang chiếm đất của lũ Viking, có thể bạn là lính đi bảo vệ những đảo hoang của người Anh trước lũ Viking. Không ai biết được, bạn có thể thử tải về chơi để rút ra cảm nhận.<br />Phần này tôi sẽ điểm ra điểm tốt, điểm xấu và đánh giá điểm số trên thang điểm 10.<br />-Điểm tốt: + Lối chơi thu hút và dễ làm quen.<br />+ Đồ họa mượt mà và chạy tốt trên các dòng máy hiện hành.<br />+ Âm thanh chill và được đầu tư<br />- Điểm xấu: + Game nhanh chán sau một thời gian<br />+ Ít khả năng tùy chỉnh trò chơi, không thể chọn mức độ đồ họa.<br />+ Thiếu chỉ dẫn rõ ràng khi chơi.<br />+ Phím bấm chưa được linh hoạt.<br />Tóm lại, Bad North là một tựa game đáng chơi. Tôi đánh giá nó 7 điểm trên 10.</p> ", new DateTime(2023, 3, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), "Review Bad North: Jotunn Edition - Tựa game Viking không mấy nổi tiếng", "Trước hết để đính chính với các bạn, mình không phải một người có kinh nghiệm trong lĩnh vực phân tích hay review game. Đây chính là...", 0, "https://images.spiderum.com/sp-images/d6f4fcd0174711eda5660b351c563c92.png", 3, 3000 });

            migrationBuilder.InsertData(
                table: "Comment",
                columns: new[] { "Id", "CreateAt", "Image", "Name", "PostId", "Text", "UserId" },
                values: new object[,]
                {
                    { 1, new DateTime(2023, 1, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://phongreviews.com/wp-content/uploads/2022/11/avatar-facebook-mac-dinh-8.jpg", "Thanh", 1, "Bai viet hay", 1 },
                    { 2, new DateTime(2023, 2, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://phongreviews.com/wp-content/uploads/2022/11/avatar-facebook-mac-dinh-8.jpg", "Long", 2, "Bai viet k hay", 2 },
                    { 3, new DateTime(2023, 3, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://phongreviews.com/wp-content/uploads/2022/11/avatar-facebook-mac-dinh-8.jpg", "Dat", 3, "Bai viet rat hay", 3 }
                });

            migrationBuilder.InsertData(
                table: "LikePost",
                columns: new[] { "Id", "IsLikePost", "PostId", "UserId" },
                values: new object[,]
                {
                    { new Guid("039d02df-1786-4c0b-b3dc-285f60188eb1"), 0, 1, 1 },
                    { new Guid("384597a5-bb89-4d99-aef8-bcb1caca3d3f"), 0, 2, 2 },
                    { new Guid("ee85e988-425e-48fd-8544-e826fd503ecc"), 0, 3, 3 }
                });

            migrationBuilder.InsertData(
                table: "Safe",
                columns: new[] { "Id", "IsSafe", "PostId", "UserId" },
                values: new object[,]
                {
                    { new Guid("25b92501-6bc2-4e39-a077-c75dc3f7add8"), 0, 2, 2 },
                    { new Guid("288ee686-b7e0-4cc4-8e95-7ebb14d181f9"), 0, 3, 3 },
                    { new Guid("8d3f5e03-0007-45d0-a04c-a23295b7e1fa"), 0, 1, 1 }
                });

            migrationBuilder.InsertData(
                table: "TagInPost",
                columns: new[] { "Id", "CategoryId", "PostId", "PostTitle", "Specification", "TagId", "TagName", "TitleImage" },
                values: new object[,]
                {
                    { new Guid("163a135a-bbcc-4d46-8541-43d72d06b5de"), 3, 3, "Review Bad North: Jotunn Edition - Tựa game Viking không mấy nổi tiếng", "Trước hết để đính chính với các bạn, mình không phải một người có kinh nghiệm trong lĩnh vực phân tích hay review game. Đây chính là...", 3, "Real-time strategy", "https://images.spiderum.com/sp-images/d6f4fcd0174711eda5660b351c563c92.png" },
                    { new Guid("8c962494-98aa-4ea9-b6a1-3730ad510570"), 2, 2, "Tại sao lại là đếm cừu chứ không phải đếm voi?", "Liệu nếu thay đổi tên con vật, thì bạn có chìm vào giấc ngủ hay không? 1 con voi, 2 con voi, 3 con chó, 4 con gà, 5 con ngỗng", 2, "Giấc mơ", "https://images.spiderum.com/sp-images/3f050e90eb1511ed97a0c5995aeeedb3.jpeg" },
                    { new Guid("f8aa2cac-fe60-4d37-a987-cb0f907ea1e7"), 1, 1, "Chúc mừng anh, Leo Messi", "Đôi lời viết cho Messi sau chức vô địch World Cup 2022", 1, "Bóng Đá", "https://images.spiderum.com/sp-images/95b65c307eff11eda3fdd33356c77f73.png" }
                });

            migrationBuilder.InsertData(
                table: "LikeComment",
                columns: new[] { "Id", "CommentId", "IsLikeComment", "UserId" },
                values: new object[,]
                {
                    { new Guid("380e9690-2d17-4d8f-8fb2-3dfce06e8a30"), 2, 0, 2 },
                    { new Guid("8cf61a44-a6de-4717-9bf1-9b570531db14"), 3, 0, 3 },
                    { new Guid("eb75c62c-01ec-48e9-bd65-4ac0160346ae"), 1, 0, 1 }
                });

            migrationBuilder.InsertData(
                table: "ReplyComment",
                columns: new[] { "Id", "CommentId", "CreateAt", "Image", "Name", "Text", "UserId" },
                values: new object[,]
                {
                    { 1, 1, new DateTime(2023, 1, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://phongreviews.com/wp-content/uploads/2022/11/avatar-facebook-mac-dinh-8.jpg", "Thanh", "toi dong y", 1 },
                    { 2, 2, new DateTime(2023, 2, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://phongreviews.com/wp-content/uploads/2022/11/avatar-facebook-mac-dinh-8.jpg", "Long", "dung vay", 2 },
                    { 3, 3, new DateTime(2023, 3, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://phongreviews.com/wp-content/uploads/2022/11/avatar-facebook-mac-dinh-8.jpg", "Dat", "chuan", 3 }
                });

            migrationBuilder.InsertData(
                table: "LikeReplyComment",
                columns: new[] { "Id", "IsLikeReplyComment", "ReplyCommentId", "UserId" },
                values: new object[] { new Guid("037bf59d-727c-4e4a-bdf2-77f7e4ac759f"), 0, 2, 2 });

            migrationBuilder.InsertData(
                table: "LikeReplyComment",
                columns: new[] { "Id", "IsLikeReplyComment", "ReplyCommentId", "UserId" },
                values: new object[] { new Guid("7c581ab8-11b0-4fed-940f-e0990ab89549"), 0, 3, 3 });

            migrationBuilder.InsertData(
                table: "LikeReplyComment",
                columns: new[] { "Id", "IsLikeReplyComment", "ReplyCommentId", "UserId" },
                values: new object[] { new Guid("d5ac402c-c4a2-47ac-b87b-d4260c6d22bc"), 0, 1, 1 });

            migrationBuilder.CreateIndex(
                name: "IX_Comment_PostId",
                table: "Comment",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_Comment_UserId",
                table: "Comment",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_LikeComment_CommentId",
                table: "LikeComment",
                column: "CommentId");

            migrationBuilder.CreateIndex(
                name: "IX_LikeComment_UserId",
                table: "LikeComment",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_LikePost_PostId",
                table: "LikePost",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_LikePost_UserId",
                table: "LikePost",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_LikeReplyComment_ReplyCommentId",
                table: "LikeReplyComment",
                column: "ReplyCommentId");

            migrationBuilder.CreateIndex(
                name: "IX_LikeReplyComment_UserId",
                table: "LikeReplyComment",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Post_CategoryId",
                table: "Post",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Post_UserId",
                table: "Post",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ReplyComment_CommentId",
                table: "ReplyComment",
                column: "CommentId");

            migrationBuilder.CreateIndex(
                name: "IX_ReplyComment_UserId",
                table: "ReplyComment",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Safe_PostId",
                table: "Safe",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_Safe_UserId",
                table: "Safe",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_TagInPost_PostId",
                table: "TagInPost",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_TagInPost_TagId",
                table: "TagInPost",
                column: "TagId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LikeComment");

            migrationBuilder.DropTable(
                name: "LikePost");

            migrationBuilder.DropTable(
                name: "LikeReplyComment");

            migrationBuilder.DropTable(
                name: "Safe");

            migrationBuilder.DropTable(
                name: "TagInPost");

            migrationBuilder.DropTable(
                name: "ReplyComment");

            migrationBuilder.DropTable(
                name: "Tag");

            migrationBuilder.DropTable(
                name: "Comment");

            migrationBuilder.DropTable(
                name: "Post");

            migrationBuilder.DropTable(
                name: "Category");

            migrationBuilder.DropTable(
                name: "User");
        }
    }
}
