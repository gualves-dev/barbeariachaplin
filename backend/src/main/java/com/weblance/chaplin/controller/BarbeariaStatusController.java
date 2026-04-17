package com.weblance.chaplin.controller;

import com.weblance.chaplin.service.BarbeariaStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/status")
@CrossOrigin("*") // Libera para o seu Front-end acessar sem erro de CORS
public class BarbeariaStatusController {

    @Autowired
    private BarbeariaStatusService service;

    @GetMapping
    public ResponseEntity<Boolean> IsOpen() {
        return ResponseEntity.ok(service.isBarbeariaOpen());
    }

    @PostMapping("/abrir")
    public ResponseEntity<String> abrir() {
        service.openNow();
        return ResponseEntity.ok("Barbearia aberta com sucesso!");
    }

    @PostMapping("/fechar")
    public ResponseEntity<String> fechar() {
        service.closeNow();
        return ResponseEntity.ok("Barbearia fechada com sucesso!");
    }

    // No seu BarbeariaStatusController, mude esta parte:
    @PostMapping("/force") // Remova o /api/status daqui, pois já está no topo
    public ResponseEntity<Void> forceStatus(@RequestParam int valor) {
        service.setComandoForcado(valor);
        return ResponseEntity.ok().build();
    }
}