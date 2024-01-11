using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace Server.Entities
{
    [Table("TagInPost")]
    
    public class TagInPost 
    {   
        
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public int TagId { get; set; }

        [Required]
        public int PostId { get; set; }

        public string TagName {get ;set; }

        public string PostTitle { get; set; }

        public string? Specification { get; set; }

        public int CategoryId { get; set; }

        public string? TitleImage { get; set; }

        public virtual Tag? Tag { get; set; }
        public virtual Post? Post { get; set; }
    }
}