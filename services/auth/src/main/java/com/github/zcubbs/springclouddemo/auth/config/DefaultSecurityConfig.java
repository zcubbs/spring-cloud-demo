package com.github.zcubbs.springclouddemo.auth.config;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity
@AllArgsConstructor
@Configuration(proxyBeanMethods = false)
public class DefaultSecurityConfig {

	private final CORSCustomizer corsCustomizer;

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		corsCustomizer.corsCustomizer(http);
		return http.formLogin()
				.and()
				.authorizeHttpRequests()
				.anyRequest().authenticated()
				.and().build();
	}

	@Bean
	public UserDetailsService userDetailsService() {
		var u1 = User.withUsername("user").password("user").authorities("read").build();

		var uds = new InMemoryUserDetailsManager();
		uds.createUser(u1);
		return uds;
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return NoOpPasswordEncoder.getInstance(); // only for API Gateway showcase
	}
}
