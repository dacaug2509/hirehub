package com.hirehub.core.seeder;

import com.hirehub.core.entities.User;
import com.hirehub.core.repositories.UserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AdminSeeder {

    @Bean
    public org.springframework.boot.CommandLineRunner adminCreator(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {
        return args -> {

            // 🔐 SINGLE SOURCE OF TRUTH
            final String ADMIN_EMAIL = "admin@hirehub.com";
            final String ADMIN_PASSWORD = "admin12345";

            User admin = userRepository.findByEmail(ADMIN_EMAIL).orElse(null);

            if (admin == null) {
                admin = new User();
                admin.setEmail(ADMIN_EMAIL);
                admin.setRole(User.Role.ADMIN);
                admin.setActive(true);
            }

            // ✅ ALWAYS RESET PASSWORD (KEY LINE)
            admin.setPassword(passwordEncoder.encode(ADMIN_PASSWORD));

            userRepository.save(admin);

            System.out.println(
                    "✅ ADMIN READY (ALWAYS): " + ADMIN_EMAIL
            );
        };
    }
}
