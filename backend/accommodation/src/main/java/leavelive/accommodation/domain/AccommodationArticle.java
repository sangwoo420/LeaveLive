package leavelive.accommodation.domain;

import leavelive.accommodation.domain.dto.AccommodationArticleDto;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AccommodationArticle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "accommodation_article_id")
    private Long id;
    private String loc;
    private String author;
    private int price;
    @Column(name = "pic_path")
    private String picPath; //,로 구분
    private int count;
    private int garden;
    private int cooking;

    // dto -> entity
    public AccommodationArticle of(AccommodationArticleDto dto){
        return AccommodationArticle.builder()
                .author(dto.getAuthor())
                .loc(dto.getLoc())
                .price(dto.getPrice())
                .picPath(dto.getPicPath())
                .count(dto.getCount())
                .cooking(dto.getCooking())
                .garden(dto.getGarden())
                .build();
    }


}
