package com.divansh.crm.lead.service;

import com.divansh.crm.lead.dto.request.LeadRequest;
import com.divansh.crm.lead.dto.response.LeadResponse;
import org.springframework.data.domain.Page;
import com.divansh.crm.customer.dto.response.CustomerResponse;

import java.util.List;

public interface LeadService {

    LeadResponse addLead(LeadRequest request);

    LeadResponse getLeadById(Long id);

    CustomerResponse convertLead(Long id);

    List<LeadResponse> getAllLeads();
    Page<LeadResponse> searchLeads(
            String customerName,
            int page,
            int size,
            String sortBy
    );

    LeadResponse updateLead(Long id, LeadRequest request);

    void deleteLead(Long id);
}