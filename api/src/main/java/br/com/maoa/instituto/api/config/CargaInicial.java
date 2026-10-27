package br.com.maoa.instituto.api.config;

import br.com.maoa.instituto.api.entity.Ponto;
import br.com.maoa.instituto.api.repository.PontoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class CargaInicial {
    @Bean
    CommandLineRunner carregarPontos(PontoRepository repository) {
        return args -> {
            if (repository.count() > 0) {
                return;
            }
            repository.saveAll(List.of(
                    new Ponto("Ponto Central Mão Amiga", "Praça Cívica, Setor Central, Goiânia - GO", "Segunda a sexta, das 08:00 às 17:00", "Recebe alimentos não perecíveis, roupas e produtos de higiene. Distribui cestas básicas e roupas.", -16.68052, -49.25637),
                    new Ponto("Unidade Esperança", "Parque Municipal Flamboyant, Rua 15, Jardim Goiás, Goiânia - GO", "Terças e quintas, das 09:00 às 16:00", "Recebe roupas, cobertores e produtos de higiene. Distribui roupas e kits de higiene.", -16.7029737, -49.2386268),
                    new Ponto("Ponto Solidário Norte", "Passeio das Águas Shopping, Avenida Perimetral Norte, Goiânia - GO", "Sábados, das 08:00 às 13:00", "Recebe alimentos não perecíveis e alimentos de feiras. Distribui cestas de alimentos.", -16.62996, -49.2785),
                    new Ponto("Centro Comunitário Sul", "Terminal Isidória, Setor Pedro Ludovico, Goiânia - GO", "Segundas, quartas e sextas, das 10:00 às 18:00", "Recebe alimentos, brinquedos e roupas infantis. Distribui itens para famílias atendidas.", -16.71387, -49.25277),
                    new Ponto("Ponto Nova Vida", "Terminal Padre Pelágio, Avenida Anhanguera, Goiânia - GO", "Segunda a sábado, das 08:30 às 15:30", "Recebe roupas, calçados e cobertores. Distribui peças de inverno e calçados.", -16.65907, -49.32719),
                    new Ponto("Unidade São José", "Goiânia Shopping, Avenida T-10, Setor Bueno, Goiânia - GO", "Terças, quintas e sábados, das 09:00 às 14:00", "Recebe alimentos, produtos de higiene e materiais escolares. Distribui kits básicos.", -16.70773, -49.27315),
                    new Ponto("Ponto Acolher", "Parque Vaca Brava, Setor Bueno, Goiânia - GO", "Quartas e sextas, das 08:00 às 17:00", "Recebe roupas, colchões e cobertores. Distribui itens de inverno.", -16.70955, -49.27099),
                    new Ponto("Centro Solidário Campinas", "Terminal Praça A, Setor Coimbra, Goiânia - GO", "Segunda a sexta, das 09:00 às 16:30", "Recebe alimentos, leite e produtos de higiene. Distribui cestas básicas e kits.", -16.67368, -49.28457)
            ));
        };
    }
}
