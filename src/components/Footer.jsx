import React from "react";
import { Box, Text, HStack, Flex } from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

export const Footer = () => {
  return (
    <Box  id="footer" textAlign="center" py={8} bg="gray.800" color="white">
    <Flex direction={{ base: 'column', md: 'row' }}
    p={4}
    align='center'
    justify='center'>
      <Text flex='1' fontSize={{ base: "xl", md: "2xl", lg: "3xl" }} mb={4}>
        FIND AND BOOK YOUR NEAREST{" "}
        <span style={{ color: "green" }}>TURF</span> JUST A CLICK AWAY!
      </Text>
      <HStack  flex='1' spacing={4} justify="center">
        <FaFacebook size={24} />
        <FaInstagram size={24} />
        <FaLinkedin size={24} />
      </HStack>
      </Flex>
    </Box>
    
  );
};
