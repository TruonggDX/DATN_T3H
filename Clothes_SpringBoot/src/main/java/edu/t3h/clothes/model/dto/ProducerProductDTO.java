package edu.t3h.clothes.model.dto;

public class ProducerProductDTO {
    //    private Long id;
    private Long producerId;
    private Long productId;

    public ProducerProductDTO(Long producerId, Long productId){
        this.producerId = producerId;
        this.productId = productId;
    }

    public ProducerProductDTO(){}

    public Long getProducerId(){return producerId;}
    public Long getProductId(){return productId;}
    public void setProducerId(Long producerId){ this.producerId = producerId;}
    public void setProductId(Long productId){this.productId = productId;}

}
