package com.weblance.chaplin.controller;

import com.weblance.chaplin.model.Cliente;
import com.weblance.chaplin.model.Profissional;
import com.weblance.chaplin.service.ProfissionalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/profissionais")
@CrossOrigin("*")
public class ProfissionalController {

    @Autowired
    private ProfissionalService service;

    // Lista todos os barbeiros (útil para o admin ou para o cliente escolher)
    @GetMapping
    public ResponseEntity<List<Profissional>> listarTodos() {
        return ResponseEntity.ok(service.listarTodos());
    }

    // Muda o status para DISPONIVEL (Barbeiro ficou livre ou chegou)
    @PutMapping("/{id}/disponivel")
    public ResponseEntity<String> setDisponivel(@PathVariable Long id) {
        service.disponivelStatus(id);
        return ResponseEntity.ok("Status atualizado: Disponível");
    }

    // Muda o status para INDISPONIVEL (Barbeiro foi almoçar ou saiu)
    @PutMapping("/{id}/indisponivel")
    public ResponseEntity<String> setIndisponivel(@PathVariable Long id) {
        service.indisponivelStatus(id);
        return ResponseEntity.ok("Status atualizado: Indisponível");
    }

    @PutMapping("/{id}/refeicao")
    public ResponseEntity<Void> ficarEmRefeicao(@PathVariable Long id) {
        // Chama o método que você criou no Service
        service.emRefeicaoStatus(id);

        // Retorna 200 OK informando que a operação foi um sucesso
        return ResponseEntity.ok().build();
    }

    // Verifica se um profissional específico está aceitando clientes
    @GetMapping("/check/{nome}")
    public ResponseEntity<String> verificar(@PathVariable String nome) {
        try {
            service.verificarStatusPorNome(nome);
            return ResponseEntity.ok("Profissional liberado para atendimento.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}