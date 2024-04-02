package edu.t3h.clothes.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import edu.t3h.clothes.model.dto.CategoryDTO;
import edu.t3h.clothes.model.dto.ColorDTO;
import edu.t3h.clothes.model.dto.ProducerDTO;
import edu.t3h.clothes.model.dto.SizeDTO;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DataImpl implements DataService {

    private final ICategoryService categoryService;
    private final IProducerService producerService;
    private final IColorService colorService;
    private final ISizeService sizeService;

    @Autowired
    public DataImpl(ICategoryService categoryService, IProducerService producerService,
                    IColorService colorService, ISizeService sizeService) {
        this.categoryService = categoryService;
        this.producerService = producerService;
        this.colorService = colorService;
        this.sizeService = sizeService;
    }

    @Override
    public Map<String, List<?>> getAllData() {
        Map<String, List<?>> allData = new HashMap<>();

        // Lấy danh sách danh mục và chuyển đổi thành List<CategoryDTO>
        BaseResponse<List<CategoryDTO>> categoriesResponse = categoryService.getAll();
        List<CategoryDTO> categories = categoriesResponse.getData();

        // Lấy danh sách nhà sản xuất và chuyển đổi thành List<ProducerDTO>
        BaseResponse<List<ProducerDTO>> producersResponse = producerService.getAll();
        List<ProducerDTO> producers = producersResponse.getData();

        // Lấy danh sách màu sắc và chuyển đổi thành List<ColorDTO>
        BaseResponse<List<ColorDTO>> colorsResponse = colorService.getAll();
        List<ColorDTO> colors = colorsResponse.getData();

        // Lấy danh sách kích thước và chuyển đổi thành List<SizeDTO>
        BaseResponse<List<SizeDTO>> sizesResponse = sizeService.getAll();
        List<SizeDTO> sizes = sizesResponse.getData();

        // Đưa dữ liệu vào Map
        allData.put("categories", categories);
        allData.put("producers", producers);
        allData.put("colors", colors);
        allData.put("sizes", sizes);

        return allData;
    }
}
