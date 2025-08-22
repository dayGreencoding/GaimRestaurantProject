package com.gaigrill.restaurantbackend;

import com.gaigrill.restaurantbackend.service.JiraService;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

@SpringBootTest
class RestaurantBackendApplicationTests {

    // Satisfy AuthController’s constructor dependency
    @MockBean
    private JiraService jiraService;

    @Test
    void contextLoads() {
    }
}
