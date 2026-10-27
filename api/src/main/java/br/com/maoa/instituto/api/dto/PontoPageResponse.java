package br.com.maoa.instituto.api.dto;

import java.util.List;

public record PontoPageResponse(List<PontoResponse> content, PageInfo page) {
    public record PageInfo(int number, int size, long totalElements, int totalPages) {
    }
}
