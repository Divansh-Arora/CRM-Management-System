package com.divansh.crm.lead.service;

import com.divansh.crm.customer.entity.CustomerStatus;
import com.divansh.crm.lead.dto.request.LeadRequest;
import com.divansh.crm.lead.dto.response.LeadResponse;
import com.divansh.crm.lead.entity.lead;
import com.divansh.crm.lead.repository.LeadRepository;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import com.divansh.crm.customer.entity.Customer;
import com.divansh.crm.customer.dto.response.CustomerResponse;
import com.divansh.crm.customer.repository.CustomerRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class LeadServiceImpl implements LeadService {

    private final LeadRepository leadRepository;
    private final CustomerRepository customerRepository;

    public LeadServiceImpl(
            LeadRepository leadRepository,
            CustomerRepository customerRepository) {

        this.leadRepository = leadRepository;
        this.customerRepository = customerRepository;
    }

    @Override
    public LeadResponse addLead(LeadRequest request) {

        if (leadRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        if (leadRepository.existsByPhone(request.getPhone())) {
            throw new RuntimeException("Phone already exists");
        }

        lead leadEntity = lead.builder()
                .customerName(request.getCustomerName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .company(request.getCompany())
                .source(request.getSource())
                .status(request.getStatus())
                .assignedTo(request.getAssignedTo())
                .build();

        lead saved = leadRepository.save(leadEntity);

        return LeadResponse.builder()
                .id(saved.getId())
                .customerName(saved.getCustomerName())
                .email(saved.getEmail())
                .phone(saved.getPhone())
                .company(saved.getCompany())
                .source(saved.getSource())
                .status(saved.getStatus())
                .assignedTo(saved.getAssignedTo())
                .createdAt(saved.getCreatedAt())
                .build();
    }

    @Override
    public LeadResponse getLeadById(Long id) {

        lead leadEntity = leadRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lead not found"));

        return LeadResponse.builder()
                .id(leadEntity.getId())
                .customerName(leadEntity.getCustomerName())
                .email(leadEntity.getEmail())
                .phone(leadEntity.getPhone())
                .company(leadEntity.getCompany())
                .source(leadEntity.getSource())
                .status(leadEntity.getStatus())
                .assignedTo(leadEntity.getAssignedTo())
                .createdAt(leadEntity.getCreatedAt())
                .build();
    }

    @Override
    public List<LeadResponse> getAllLeads() {

        List<lead> leads = leadRepository.findAll();

        List<LeadResponse> response = new ArrayList<>();

        for (lead leadEntity : leads) {

            response.add(
                    LeadResponse.builder()
                            .id(leadEntity.getId())
                            .customerName(leadEntity.getCustomerName())
                            .email(leadEntity.getEmail())
                            .phone(leadEntity.getPhone())
                            .company(leadEntity.getCompany())
                            .source(leadEntity.getSource())
                            .status(leadEntity.getStatus())
                            .assignedTo(leadEntity.getAssignedTo())
                            .createdAt(leadEntity.getCreatedAt())
                            .build()
            );
        }

        return response;
    }

    @Override
    public LeadResponse updateLead(Long id, LeadRequest request) {

        lead leadEntity = leadRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lead not found"));

        leadEntity.setCustomerName(request.getCustomerName());
        leadEntity.setEmail(request.getEmail());
        leadEntity.setPhone(request.getPhone());
        leadEntity.setCompany(request.getCompany());
        leadEntity.setSource(request.getSource());
        leadEntity.setStatus(request.getStatus());
        leadEntity.setAssignedTo(request.getAssignedTo());

        lead updated = leadRepository.save(leadEntity);

        return LeadResponse.builder()
                .id(updated.getId())
                .customerName(updated.getCustomerName())
                .email(updated.getEmail())
                .phone(updated.getPhone())
                .company(updated.getCompany())
                .source(updated.getSource())
                .status(updated.getStatus())
                .assignedTo(updated.getAssignedTo())
                .createdAt(updated.getCreatedAt())
                .build();
    }

    @Override
    public void deleteLead(Long id) {

        lead leadEntity = leadRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lead not found"));

        leadRepository.delete(leadEntity);
    }
    @Override
    public Page<LeadResponse> searchLeads(
            String customerName,
            int page,
            int size,
            String sortBy) {

        Pageable pageable =
                PageRequest.of(page, size, Sort.by(sortBy));

        Page<lead> leads =
                leadRepository.findByCustomerNameContainingIgnoreCase(
                        customerName,
                        pageable);

        return leads.map(l ->

                LeadResponse.builder()
                        .id(l.getId())
                        .customerName(l.getCustomerName())
                        .email(l.getEmail())
                        .phone(l.getPhone())
                        .company(l.getCompany())
                        .source(l.getSource())
                        .status(l.getStatus())
                        .assignedTo(l.getAssignedTo())
                        .createdAt(l.getCreatedAt())
                        .build()

        );
    }
    @Override
    public CustomerResponse convertLead(Long id) {

        lead lead = leadRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Lead not found"));

        if ("CONVERTED".equalsIgnoreCase(lead.getStatus())) {
            throw new RuntimeException("Lead already converted");
        }

        Customer customer = Customer.builder()
                .firstName(lead.getCustomerName())
                .lastName("")
                .email(lead.getEmail())
                .phone(lead.getPhone())
                .company(lead.getCompany())
                .city("")
                .status(CustomerStatus.ACTIVE)
                .build();

        Customer savedCustomer =
                customerRepository.save(customer);

        lead.setStatus("CONVERTED");

        leadRepository.save(lead);

        return CustomerResponse.builder()
                .id(savedCustomer.getId())
                .firstName(savedCustomer.getFirstName())
                .lastName(savedCustomer.getLastName())
                .email(savedCustomer.getEmail())
                .phone(savedCustomer.getPhone())
                .company(savedCustomer.getCompany())
                .city(savedCustomer.getCity())
                .status(savedCustomer.getStatus())
                .createdAt(savedCustomer.getCreatedAt())
                .build();
    }
}