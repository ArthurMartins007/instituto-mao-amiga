package br.com.maoa.instituto.api.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "pontos")
public class Ponto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String endereco;
    private String horario;
    private String recebeDistribui;
    private Double latitude;
    private Double longitude;

    protected Ponto() {
    }

    public Ponto(String nome, String endereco, String horario, String recebeDistribui, Double latitude, Double longitude) {
        this.nome = nome;
        this.endereco = endereco;
        this.horario = horario;
        this.recebeDistribui = recebeDistribui;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getEndereco() {
        return endereco;
    }

    public String getHorario() {
        return horario;
    }

    public String getRecebeDistribui() {
        return recebeDistribui;
    }

    public Double getLatitude() {
        return latitude;
    }

    public Double getLongitude() {
        return longitude;
    }
}
