package com.weblance.chaplin.service;

import com.weblance.chaplin.repository.BarbeariaStatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalTime;
import java.time.ZoneId;

@Service
public class BarbeariaStatusService {

    private int comandoForcado = -1;

    @Autowired
    private BarbeariaStatusRepository repository;

    public boolean isBarbeariaOpen() {

        if (comandoForcado == 1)
            return true;
        if (comandoForcado == 0)
            return false;

        // 2. Se não houver comando forçado, segue a sua lógica original
        boolean statusNoBanco = repository.findById(1L).map(status -> status.isAberto()).orElse(false);
        LocalTime timeAgora = LocalTime.now(ZoneId.of("America/Sao_Paulo"));

        boolean horarioValido = timeAgora.isAfter(LocalTime.of(8, 29)) && timeAgora.isBefore(LocalTime.of(19, 30));

        return statusNoBanco && horarioValido;

    }

    // Método novo para o Controller chamar
    public void setComandoForcado(int valor) {
        this.comandoForcado = valor;
    }

    public void closeNow() {

        var status = repository.findById(1L).orElseThrow(() -> new RuntimeException("Status nao encontrado"));

        status.setAberto(false);

        repository.save(status);
        this.comandoForcado = 0;

    }

    public void openNow() {

        var status = repository.findById(1L).orElseThrow(() -> new RuntimeException("Status nao encontrado"));

        status.setAberto(true);

        repository.save(status);
        this.comandoForcado = 1;

    }

}
