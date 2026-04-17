package com.weblance.chaplin.controller;

import com.weblance.chaplin.model.Cliente;
import com.weblance.chaplin.service.ClienteService;
import com.weblance.chaplin.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = "*")

public class ClienteController {

    @Autowired
    private ClienteService service;

    @Autowired
    private ClienteRepository repository;

    @GetMapping
    public ResponseEntity<List<Cliente>> listarFila() {
        return ResponseEntity.ok(repository.findAll());
    }

    @GetMapping("/fila/{nomeBarbeiro}")
    public List<Cliente> listarFilaDoBarbeiro(@PathVariable String nomeBarbeiro) {
        // Passamos o nome do barbeiro que vem na URL e a palavra "nenhum" para pegar os
        // sem preferência
        return repository.findByProfissionalIgnoreCaseOrProfissionalIgnoreCaseOrderByIdAsc(nomeBarbeiro, "nenhum");
    }

    // Rota para o cliente ENTRAR NA FILA
    @PostMapping("/entrar")
    public ResponseEntity<?> entrarNaFila(@RequestBody Cliente cliente) {
        try {
            Cliente novoCliente = service.entrarNaFila(cliente);
            return ResponseEntity.ok(novoCliente);
        } catch (RuntimeException e) {
            // Retorna o erro (Ex: "Barbearia fechada") para o Front mostrar no alert
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Rota para o barbeiro CHAMAR o próximo (Muda status para ATENDENDO)
    @PutMapping("/chamar/{clienteId}/{profissionalId}")
    public ResponseEntity<String> chamar(@PathVariable Long clienteId, @PathVariable Long profissionalId) {
        try {
            service.chamarCliente(clienteId, profissionalId);
            return ResponseEntity.ok("Cliente chamado! Prepare a cadeira.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Rota para FINALIZAR (Deleta do banco e libera barbeiro)
    @DeleteMapping("/finalizar/{clienteId}/{profissionalId}")
    public ResponseEntity<String> finalizar(@PathVariable Long clienteId, @PathVariable Long profissionalId) {
        try {
            service.finalizarAtendimento(clienteId, profissionalId);
            return ResponseEntity.ok("Atendimento finalizado e removido do sistema.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("sair/{ID}")
    public ResponseEntity<String> removerCliente(@PathVariable Long ID) {
        repository.deleteById(ID);
        return ResponseEntity.ok("Cliente Removido");
    }
}
