package br.com.maoa.instituto.api.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "doacoes")
public class Doacao {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String tipoItem;

    @Column(nullable = false)
    private Integer quantidade;

    @Column(nullable = false)
    private String pontoDestino;

    @Column(nullable = false, updatable = false)
    private LocalDateTime criadoEm;

    protected Doacao() {
    }

    public Doacao(String tipoItem, Integer quantidade, String pontoDestino, LocalDateTime criadoEm) {
        this.tipoItem = tipoItem;
        this.quantidade = quantidade;
        this.pontoDestino = pontoDestino;
        this.criadoEm = criadoEm;
    }

    public UUID getId() { return id; }
    public String getTipoItem() { return tipoItem; }
    public Integer getQuantidade() { return quantidade; }
    public String getPontoDestino() { return pontoDestino; }
    public LocalDateTime getCriadoEm() { return criadoEm; }

    // Só altera os campos que o usuário pode editar.
    public void atualizar(String tipoItem, Integer quantidade, String pontoDestino) {
        this.tipoItem = tipoItem;
        this.quantidade = quantidade;
        this.pontoDestino = pontoDestino;
    }
}
