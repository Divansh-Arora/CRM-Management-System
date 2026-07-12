package com.divansh.crm.customer.controller;

import com.divansh.crm.customer.dto.request.CustomerRequest;
import com.divansh.crm.customer.dto.response.CustomerResponse;
import com.divansh.crm.customer.service.CustomerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
@Tag(name = "Customer API", description = "Customer Management APIs")
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    // ===========================
    // Add Customer
    // ===========================
    @Operation(summary = "Add a new customer")
    @PostMapping
    public ResponseEntity<CustomerResponse> addCustomer(
            @Valid @RequestBody CustomerRequest request) {

        CustomerResponse response = customerService.addCustomer(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // ===========================
    // Get All Customers
    // ===========================
    @Operation(summary = "Get all customers")
    @GetMapping
    public ResponseEntity<List<CustomerResponse>> getAllCustomers() {

        return ResponseEntity.ok(customerService.getAllCustomers());
    }

    // ===========================
    // Get Customer By ID
    // ===========================
    @Operation(summary = "Get customer by ID")
    @GetMapping("/{id}")
    public ResponseEntity<CustomerResponse> getCustomerById(
            @PathVariable Long id) {

        CustomerResponse response = customerService.getCustomerById(id);

        return ResponseEntity.ok(response);
    }

    // ===========================
    // Update Customer
    // ===========================
    @Operation(summary = "Update customer")
    @PutMapping("/{id}")
    public ResponseEntity<CustomerResponse> updateCustomer(
            @PathVariable Long id,
            @Valid @RequestBody CustomerRequest request) {

        CustomerResponse response = customerService.updateCustomer(id, request);

        return ResponseEntity.ok(response);
    }

    // ===========================
    // Delete Customer
    // ===========================
    @Operation(summary = "Delete customer")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCustomer(
            @PathVariable Long id) {

        customerService.deleteCustomer(id);

        return ResponseEntity.ok("Customer deleted successfully.");
    }
    @GetMapping("/search")
    public ResponseEntity<Page<CustomerResponse>> searchCustomers(

            @RequestParam(defaultValue = "") String name,

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "5") int size,

            @RequestParam(defaultValue = "firstName") String sortBy) {

        return ResponseEntity.ok(

                customerService.searchCustomers(
                        name,
                        page,
                        size,
                        sortBy)

        );
    }
}