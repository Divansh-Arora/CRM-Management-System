package com.divansh.crm.lead.controller;

import com.divansh.crm.lead.dto.request.LeadRequest;
import com.divansh.crm.lead.dto.response.LeadResponse;
import com.divansh.crm.lead.service.LeadService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import com.divansh.crm.customer.dto.response.CustomerResponse;

import java.util.List;

@RestController
@RequestMapping("/api/leads")
@Tag(name = "Lead API", description = "Lead Management APIs")
public class LeadController {

    private final LeadService leadService;

    public LeadController(LeadService leadService) {
        this.leadService = leadService;
    }

    @PostMapping
    public ResponseEntity<LeadResponse> addLead(
            @Valid @RequestBody LeadRequest request) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(leadService.addLead(request));
    }

    @GetMapping
    public ResponseEntity<List<LeadResponse>> getAllLeads() {

        return ResponseEntity.ok(leadService.getAllLeads());
    }

    @GetMapping("/{id}")
    public ResponseEntity<LeadResponse> getLeadById(
            @PathVariable Long id) {

        return ResponseEntity.ok(leadService.getLeadById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<LeadResponse> updateLead(
            @PathVariable Long id,
            @Valid @RequestBody LeadRequest request) {

        return ResponseEntity.ok(
                leadService.updateLead(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteLead(
            @PathVariable Long id) {

        leadService.deleteLead(id);

        return ResponseEntity.ok("Lead deleted successfully");
    }
    @GetMapping("/search")
    public ResponseEntity<Page<LeadResponse>> searchLeads(

            @RequestParam(defaultValue = "") String customerName,

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "5") int size,

            @RequestParam(defaultValue = "customerName") String sortBy) {

        return ResponseEntity.ok(
                leadService.searchLeads(
                        customerName,
                        page,
                        size,
                        sortBy
                )
        );
    }
    @PostMapping("/{id}/convert")
    public ResponseEntity<CustomerResponse> convertLead(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                leadService.convertLead(id)
        );
    }
}