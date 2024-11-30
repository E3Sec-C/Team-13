import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Avatar,
  Container,
  Paper,
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

const testimonials = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    role: "Professor of Computer Science",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    quote: "Our department's commitment to excellence in teaching and research has consistently produced outstanding graduates who excel in the tech industry.",
  },
  {
    id: 2,
    name: "James Wilson",
    role: "Alumni, Software Engineer at Google",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    quote: "The practical experience and strong theoretical foundation I gained during my time at the CSE department were instrumental in launching my career.",
  },
  {
    id: 3,
    name: "Emily Chen",
    role: "Current Student",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    quote: "The supportive environment and cutting-edge curriculum have helped me develop both technical skills and professional confidence.",
  },
  {
    id: 4,
    name: "Dr. Michael Brown",
    role: "Department Research Lead",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    quote: "Our research initiatives and industry collaborations provide students with unique opportunities to work on real-world problems.",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-scroll functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const handlePrev = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography
        variant="h3"
        component="h2"
        align="center"
        gutterBottom
        sx={{
          mb: 6,
          color: 'text.blue',
          fontWeight: 'bold',
        }}
      >
        What People Say
      </Typography>

      <Box sx={{ position: 'relative' }}>
        <Paper
          elevation={3}
          sx={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 4,
            bgcolor: 'background.paper',
            height: 400, // Fixed height
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Card
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              transition: 'all 0.5s ease-in-out',
              transform: isAnimating ? 'scale(0.98) translateX(-2%)' : 'scale(1) translateX(0)',
              opacity: isAnimating ? 0.8 : 1,
              boxShadow: 'none'
            }}
          >
            <CardContent 
              sx={{ 
                width: '100%',
                maxWidth: 800,
                padding: '2rem',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 3,
                animation: isAnimating ? 'slideIn 0.5s ease-in-out' : 'none',
              }}
            >
              <FormatQuoteIcon
                sx={{
                  fontSize: 60,
                  color: 'grey.300',
                  animation: isAnimating ? 'rotateIn 0.5s ease-in-out' : 'none',
                }}
              />
              <Typography
                variant="h5"
                component="p"
                sx={{
                  maxWidth: 700,
                  fontStyle: 'italic',
                  color: 'text.secondary',
                  animation: isAnimating ? 'fadeIn 0.5s ease-in-out' : 'none',
                  lineHeight: 1.6
                }}
              >
                "{testimonials[currentIndex].quote}"
              </Typography>
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: 2,
                  animation: isAnimating ? 'slideUp 0.5s ease-in-out' : 'none',
                  mt: 2
                }}
              >
                <Avatar
                  src={testimonials[currentIndex].image}
                  sx={{ 
                    width: 64, 
                    height: 64,
                    animation: isAnimating ? 'scaleIn 0.5s ease-in-out' : 'none',
                  }}
                />
                <Box>
                  <Typography 
                    variant="h6" 
                    component="p" 
                    sx={{ 
                      color: 'text.primary',
                      animation: isAnimating ? 'fadeIn 0.5s ease-in-out' : 'none',
                    }}
                  >
                    {testimonials[currentIndex].name}
                  </Typography>
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      color: 'text.secondary',
                      animation: isAnimating ? 'fadeIn 0.5s ease-in-out 0.2s' : 'none',
                    }}
                  >
                    {testimonials[currentIndex].role}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Paper>

        {/* Navigation Buttons */}
        <IconButton
          onClick={handlePrev}
          sx={{
            position: 'absolute',
            left: { xs: -16, md: -28 },
            top: '50%',
            transform: 'translateY(-50%)',
            bgcolor: 'background.paper',
            boxShadow: 2,
            '&:hover': { bgcolor: 'grey.100' },
            zIndex: 2
          }}
        >
          <NavigateBeforeIcon />
        </IconButton>
        <IconButton
          onClick={handleNext}
          sx={{
            position: 'absolute',
            right: { xs: -16, md: -28 },
            top: '50%',
            transform: 'translateY(-50%)',
            bgcolor: 'background.paper',
            boxShadow: 2,
            '&:hover': { bgcolor: 'grey.100' },
            zIndex: 2
          }}
        >
          <NavigateNextIcon />
        </IconButton>

        {/* Dots indicator */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 1,
            mt: 3,
          }}
        >
          {testimonials.map((_, index) => (
            <Box
              key={index}
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: index === currentIndex ? 'primary.main' : 'grey.300',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Animation Keyframes */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(${isAnimating ? '100%' : '-100%'});
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes rotateIn {
          from {
            transform: rotate(-180deg);
            opacity: 0;
          }
          to {
            transform: rotate(0);
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }
      `}</style>
    </Container>
  );
};

export default Testimonials;
