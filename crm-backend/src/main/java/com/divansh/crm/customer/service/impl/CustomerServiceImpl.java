package com.divansh.crm.customer.service.impl;

import com.divansh.crm.customer.dto.request.CustomerRequest;
import com.divansh.crm.customer.dto.response.CustomerResponse;
import com.divansh.crm.customer.entity.Customer;
import com.divansh.crm.customer.repository.CustomerRepository;
import com.divansh.crm.customer.service.CustomerService;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.ArrayList;
import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public CustomerResponse addCustomer(CustomerRequest request) {

        if (customerRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists.");
        }

        if (customerRepository.existsByPhone(request.getPhone())) {
            throw new RuntimeException("Phone number already exists.");
        }

        Customer customer = Customer.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .company(request.getCompany())
                .city(request.getCity())
                .status(request.getStatus())
                .build();

        Customer savedCustomer = customerRepository.save(customer);

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

    @Override
    public CustomerResponse getCustomerById(Long id) {

        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        return CustomerResponse.builder()
                .id(customer.getId())
                .firstName(customer.getFirstName())
                .lastName(customer.getLastName())
                .email(customer.getEmail())
                .phone(customer.getPhone())
                .company(customer.getCompany())
                .city(customer.getCity())
                .status(customer.getStatus())
                .createdAt(customer.getCreatedAt())
                .build();
    }

    @Override
    public List<CustomerResponse> getAllCustomers() {

        List<Customer> customers = customerRepository.findAll();

        List<CustomerResponse> responseList = new ArrayList<>();

        for (Customer customer : customers) {

            CustomerResponse response = CustomerResponse.builder()
                    .id(customer.getId())
                    .firstName(customer.getFirstName())
                    .lastName(customer.getLastName())
                    .email(customer.getEmail())
                    .phone(customer.getPhone())
                    .company(customer.getCompany())
                    .city(customer.getCity())
                    .status(customer.getStatus())
                    .createdAt(customer.getCreatedAt())
                    .build();

            responseList.add(response);
        }

        return responseList;
    }

    @Override
    public CustomerResponse updateCustomer(Long id, CustomerRequest request) {

        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        customer.setFirstName(request.getFirstName());
        customer.setLastName(request.getLastName());
        customer.setEmail(request.getEmail());
        customer.setPhone(request.getPhone());
        customer.setCompany(request.getCompany());
        customer.setCity(request.getCity());
        customer.setStatus(request.getStatus());

        Customer updatedCustomer = customerRepository.save(customer);

        return CustomerResponse.builder()
                .id(updatedCustomer.getId())
                .firstName(updatedCustomer.getFirstName())
                .lastName(updatedCustomer.getLastName())
                .email(updatedCustomer.getEmail())
                .phone(updatedCustomer.getPhone())
                .company(updatedCustomer.getCompany())
                .city(updatedCustomer.getCity())
                .status(updatedCustomer.getStatus())
                .createdAt(updatedCustomer.getCreatedAt())
                .build();
    }

    @Override
    public void deleteCustomer(Long id) {

        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        customerRepository.delete(customer);
    }
    @Override
    public Page<CustomerResponse> searchCustomers(
            String name,
            int page,
            int size,
            String sortBy) {

        Pageable pageable =
                PageRequest.of(page, size, Sort.by(sortBy));

        Page<Customer> customers =
                customerRepository.findByFirstNameContainingIgnoreCase(
                        name,
                        pageable);

        return customers.map(customer ->

                CustomerResponse.builder()
                        .id(customer.getId())
                        .firstName(customer.getFirstName())
                        .lastName(customer.getLastName())
                        .email(customer.getEmail())
                        .phone(customer.getPhone())
                        .company(customer.getCompany())
                        .city(customer.getCity())
                        .status(customer.getStatus())
                        .createdAt(customer.getCreatedAt())
                        .build()

        );
    }
}