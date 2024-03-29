package com.sg.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


@Service
public class EmailService {
  
    @Autowired
    private JavaMailSender mailSender;

    public void dispatchEmailPostContactForm(
      String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage(); 
        // set the sender name 
        message.setFrom("noreply@footrixsg.com");
        message.setTo(to); 
        message.setSubject(subject); 
        message.setText(text);
        mailSender.send(message);
    }
}
