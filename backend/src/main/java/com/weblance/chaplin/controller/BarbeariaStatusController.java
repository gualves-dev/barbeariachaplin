package com.weblance.chaplin.controller;

import com.weblance.chaplin.model.BarbeariaStatus;
import com.weblance.chaplin.service.BarbeariaStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/status")
@CrossOrigin("*") 
public class BarbeariaStatusController {

    @Autowired
    private BarbeariaStatusService service;

    // Retorna se a barbearia está aberta ou fechada (pro Front-end do Cliente)
    @GetMapping("/is-open")
    public ResponseEntity<Boolean> isOpen() {
        return ResponseEntity.ok(service.isBarbeariaOpen());
    }

    // Retorna as configurações atuais das chaves (pro Painel do Barbeiro carregar os switches)
    @GetMapping("/config")
    public ResponseEntity<BarbeariaStatus> getConfig() {
        // Precisamos criar esse método no Service para buscar do banco
        return ResponseEntity.ok(service.buscarConfiguracao());
    }

    // Salva todas as configurações (Switches, Datas e Horários)
    @PutMapping("/update")
    public ResponseEntity<String> updateConfig(@RequestBody BarbeariaStatus novaConfig) {
        service.atualizarConfiguracao(novaConfig);
        return ResponseEntity.ok("Configurações atualizadas com sucesso!");
    }
}