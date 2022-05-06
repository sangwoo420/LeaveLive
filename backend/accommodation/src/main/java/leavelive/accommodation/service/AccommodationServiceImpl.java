package leavelive.accommodation.service;

import leavelive.accommodation.domain.AccommodationArticle;
import leavelive.accommodation.domain.AccommodationFav;
import leavelive.accommodation.domain.dto.AccommodationArticleDto;
import leavelive.accommodation.exception.FileNotFoundException;
import leavelive.accommodation.exception.MyResourceNotFoundException;
import leavelive.accommodation.repository.FavoriteRepository;
import leavelive.accommodation.repository.AccommodationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class AccommodationServiceImpl{
    private final AccommodationRepository repo;
    private final FavoriteRepository favRepo;

    public List<AccommodationArticleDto> getAllAccommodationByLoc(String loc) {
        List<AccommodationArticle> entities=repo.findAllByLocStartsWith(loc);
        return entities.stream().map(AccommodationArticleDto::of).collect(Collectors.toList());
    }
    public List<AccommodationArticleDto> getAllAccommodation() {
        List<AccommodationArticle> entities=repo.findAll();
        return entities.stream().map(AccommodationArticleDto::of).collect(Collectors.toList());
    }
    public AccommodationArticleDto getAccommodation(Long id) {
        Optional<AccommodationArticle> entity=repo.findById(id);
        if(!entity.isPresent())throw new MyResourceNotFoundException("해당하는 숙소가 없습니다.");
        return AccommodationArticleDto.of(entity.get());
    }

    public Boolean delete(Long id,String userId) {
        // 내가 작성한 숙소가 맞는지 확인
        Optional<AccommodationArticle> accommodationArticle=repo.findById(id);
        if(!accommodationArticle.isPresent()) throw new MyResourceNotFoundException("해당하는 숙소가 없습니다.");
        if(!accommodationArticle.get().getUserId().equals(userId)) throw new MyResourceNotFoundException("자신이 등록한 숙소만 삭제할 수 있습니다.");
        // 연결되어있는거 먼저 삭제
        // id를 가지고 있는 모든 favRepo 찾고, 삭제
        List<AccommodationFav> list=favRepo.findAllByAcommodationId(id);
        if(list!=null) {
            for(AccommodationFav entity:list) favRepo.deleteById(entity.getId());
        }
        repo.deleteById(id);
        return true;
    }

    public Long save(AccommodationArticleDto dto,String userId, List<MultipartFile> files) {
        dto.setUserId(userId);
        AccommodationArticle entity=new AccommodationArticle();
        // 이미지 파일 저장
        log.info("AccommodationServiceImpl.save.files:"+files);
        if(files!=null){
            String img_path=saveImage(files);
            dto.setPicPath(img_path);
        }
        return repo.save(entity.of(dto)).getId();
    }

    public AccommodationArticleDto update(AccommodationArticleDto dto,Long id,String userId) {
        Optional<AccommodationArticle> entity=repo.findById(id);
        AccommodationArticle result=new AccommodationArticle();
        if(!entity.isPresent()) throw new MyResourceNotFoundException("해당하는 숙소가 없습니다.");
        if(!entity.get().getUserId().equals(userId)) throw new MyResourceNotFoundException("자신이 등록한 숙소만 수정할 수 있습니다.");
        AccommodationArticleDto oriDto=new AccommodationArticleDto(); //현재 entity
        oriDto=oriDto.of(entity.get());
        oriDto.setId(id);
        oriDto.setUserId(userId);
        // 바뀐 부분
        if(dto.getCnt()!=0){
            oriDto.setCnt(dto.getCnt());
        }
        if(dto.getContents()!=null){
            oriDto.setContents(dto.getContents());
        }
        if(dto.getPrice()!=0){
            oriDto.setPrice(dto.getPrice());
        }
        if(dto.getLoc()!=null){
            oriDto.setLoc(dto.getLoc());
        }
        if(dto.getName()!=null){
            oriDto.setName(dto.getName());
        }
        if(dto.getPicPath()!=null){
            oriDto.setPicPath(dto.getPicPath());
        }
        if(dto.getCooking()!=oriDto.getCooking()){
            oriDto.setCooking(dto.getCooking());
        }
        if(dto.getGarden()!=oriDto.getGarden()){
            oriDto.setGarden(dto.getGarden());
        }
        repo.save(result.updateOf(oriDto));
        return dto;
    }

    public String saveImage(List<MultipartFile> files) {
        String images="";
        if(files!=null){
            LocalDateTime now= LocalDateTime.now(); //현재 시간 저장
            DateTimeFormatter dateTimeFormatter =
                    DateTimeFormatter.ofPattern("yyyyMMdd");
            String current_date = now.format(dateTimeFormatter);

            String abPath=new File("").getAbsolutePath()+File.separator;
            log.info("AccommodationServiceImpl.saveImage.abPath:"+abPath);

            // 세부 경로
            String path="images"+File.separator+current_date;
            File file=new File(path);
            log.info("AccommodationServiceImpl.saveImage.path:"+path);

            if(!file.exists()){
                boolean success=file.mkdir();
                if(!success){
                    throw new FileNotFoundException("파일 경로를 생성하지 못했습니다.");
                }
            }
            for (MultipartFile multipartFile:files){
                String originalFileExtension;
                String contentType=multipartFile.getContentType();
                if(ObjectUtils.isEmpty(contentType)){
                    continue;
                }
                if(contentType.contains("image/PNG")){
                    originalFileExtension=".PNG";
                }else if(contentType.contains("image/png")){
                    originalFileExtension=".png";
                }else if(contentType.contains("image/jpeg")){
                    originalFileExtension=".jpeg";
                }else if(contentType.contains("image/JPEG")){
                    originalFileExtension=".JPEG";
                }else{
                    log.error("AccommodationServiceImpl.saveImage:이미지 파일만 올릴 수 있습니다.");
                    continue;
                }
                String new_file_name=System.nanoTime()+multipartFile.getName()+originalFileExtension;

                // 업로드 한 파일 데이터를 지정한 파일에 저장
                try{
                    file = new File(abPath + path + File.separator + new_file_name);
                    multipartFile.transferTo(file);
                }catch (Exception e){
                    e.printStackTrace();
                    throw new FileNotFoundException("이미지 저장에 실패했습니다.");
                }
                file.setWritable(true);
                file.setReadable(true);

                images+=abPath + path + File.separator + new_file_name+",";
            }
            // 마지막 콤마는 빼기
            images=images.substring(0,images.length()-1);
        }
        return images;
    }

    public byte[] findImage(String imagePath) throws IOException {
        InputStream imageStream;
        try{
            imageStream = new FileInputStream(imagePath);
        }catch(Exception e){
            e.printStackTrace();
            throw new MyResourceNotFoundException("해당하는 파일이 없습니다.");
        }
        byte[] imageByteArray = IOUtils.toByteArray(imageStream);
        imageStream.close();
        return imageByteArray;
    }
}
