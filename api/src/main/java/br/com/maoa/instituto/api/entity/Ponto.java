package br.com.maoa.instituto.api.entity;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "pontos")
public class Ponto {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String endereco;

    @Column(nullable = false)
    private String bairro;

    @Column(nullable = false)
    private String horario;

    @Column(nullable = false)
    private String tipo;

    private Double latitude;
    private Double longitude;

    protected Ponto() {
    }

    public Ponto(String nome, String endereco, String bairro, String horario, String tipo,
                 Double latitude, Double longitude) {
        this.nome = nome;
        this.endereco = endereco;
        this.bairro = bairro;
        this.horario = horario;
        this.tipo = tipo;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public UUID getId() { return id; }
    public String getNome() { return nome; }
    public String getEndereco() { return endereco; }
    public String getBairro() { return bairro; }
    public String getHorario() { return horario; }
    public String getTipo() { return tipo; }
    public Double getLatitude() { return latitude; }
    public Double getLongitude() { return longitude; }

    // Atualiza os dados editáveis sem mexer nas coordenadas já registradas.
    public void atualizar(String nome, String endereco, String bairro, String horario, String tipo) {
        this.nome = nome;
        this.endereco = endereco;
        this.bairro = bairro;
        this.horario = horario;
        this.tipo = tipo;
    }
}
