package com.weblance.chaplin.service;

import com.weblance.chaplin.model.BarbeariaStatus;
import com.weblance.chaplin.repository.BarbeariaStatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;

@Service
public class BarbeariaStatusService {

    @Autowired
    private BarbeariaStatusRepository repository;

    private final ZoneId fusoHorario = ZoneId.of("America/Sao_Paulo");

    public boolean isBarbeariaOpen() {
        // Busca a configuração no banco (ID 1)
        BarbeariaStatus config = repository.findById(1L)
                .orElseThrow(() -> new RuntimeException("Configuração não encontrada no banco!"));

        LocalTime agora = LocalTime.now(fusoHorario);
        LocalDate hoje = LocalDate.now(fusoHorario);

        // 1. PRIORIDADE MÁXIMA: CHAVE MANUAL
        if (config.isChaveManual()) {
            return config.isAbertoManual(); 
        }

        // 2. PRIORIDADE MÉDIA: CHAVE PROGRAMADA
        if (config.isChaveProgramada()) {
            // Verifica se existe data e se a data é hoje
            if (config.getDataProgramada() != null && config.getDataProgramada().equals(hoje)) {
                return agora.isAfter(config.getInicioProgramado()) && 
                agora.isBefore(config.getFimProgramado());
            }
            // Se a chave tá ligada mas não é o dia, ele "escorrega" para a próxima regra
        }

        // 3. PRIORIDADE BASE: TRAVA AUTOMÁTICA
        if (config.isChaveAutomatica()) {
            return agora.isAfter(LocalTime.of(8, 29)) && 
            agora.isBefore(LocalTime.of(19, 30));
        }

        // 4. SEGURANÇA TOTAL: Se nenhuma chave estiver ativa
        // Decida aqui: você quer que fique sempre fechado ou siga o padrão?
        // Vou deixar seguindo o padrão de 8h30-19h30 por segurança.
        return agora.isAfter(LocalTime.of(8, 29)) && agora.isBefore(LocalTime.of(19, 30));
    }

    // Método para atualizar as chaves (o seu Controller vai chamar esse)
    public void atualizarConfiguracao(BarbeariaStatus novaConfig) {
        BarbeariaStatus banco = repository.findById(1L).orElse(new BarbeariaStatus());
        
        // Atualiza apenas o que veio do front
        banco.setChaveManual(novaConfig.isChaveManual());
        banco.setChaveProgramada(novaConfig.isChaveProgramada());
        banco.setChaveAutomatica(novaConfig.isChaveAutomatica());
        banco.setAbertoManual(novaConfig.isAbertoManual());
        banco.setDataProgramada(novaConfig.getDataProgramada());
        banco.setInicioProgramado(novaConfig.getInicioProgramado());
        banco.setFimProgramado(novaConfig.getFimProgramado());

        repository.save(banco);
    }

    public BarbeariaStatus buscarConfiguracao() {
    // Busca a linha 1. Se não existir (primeira vez), cria uma nova
    return repository.findById(1L).orElseGet(() -> {
        BarbeariaStatus nova = new BarbeariaStatus();
        nova.setId(1L);
        return repository.save(nova);
    });
}
}