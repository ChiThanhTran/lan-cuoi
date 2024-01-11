namespace Server.DTO
{
    public class TagInPostDTO
    {
        public int TagId { get; set; }

        public int PostId { get; set; }

        public string TagName { get; set; }

        public string PostTitle { get; set; }

        public string? Specification { get; set; }

        public int CategoryId { get; set; }

        public string? TitleImage { get; set; }
    }
}