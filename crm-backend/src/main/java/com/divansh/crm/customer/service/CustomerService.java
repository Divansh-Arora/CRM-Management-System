package com.divansh.crm.customer.service;

import com.divansh.crm.customer.dto.request.CustomerRequest;
import com.divansh.crm.customer.dto.response.CustomerResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface CustomerService {

    CustomerResponse addCustomer(CustomerRequest request);

    CustomerResponse getCustomerById(Long id);

    List<CustomerResponse> getAllCustomers();

    Page<CustomerResponse> searchCustomers(
            String name,
            int page,
            int size,
            String sortBy
    );

    CustomerResponse updateCustomer(Long id, CustomerRequest request);

    void deleteCustomer(Long id);
}