package com.weblance.chaplin.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "barbeariastatus")
@Data 
public class BarbeariaStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // --- AS 3 CHAVES (SWITCHES) ---
    
    @Column(name = "chave_manual", nullable = false)
    private boolean chaveManual = false;

    @Column(name = "chave_programada", nullable = false)
    private boolean chaveProgramada = false;

    @Column(name = "chave_automatica", nullable = false)
    private boolean chaveAutomatica = true; // Por padrão, a trava de horário vem ligada

    // --- DADOS DE APOIO ---

    @Column(name = "aberto_manual", nullable = false)
    private boolean abertoManual; // O valor que o botão "Abrir/Fechar" envia

    @Column(name = "data_programada")
    private LocalDate dataProgramada; // Para o modo programado

    @Column(name = "inicio_programado")
    private LocalTime inicioProgramado;

    @Column(name = "fim_programado")
    private LocalTime fimProgramado;

    // Mantendo o campo antigo por compatibilidade, se necessário
    @Column(name = "aberto", nullable = false)
    private boolean aberto;
}