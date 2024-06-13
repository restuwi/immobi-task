import {
  Box,
  IconButton,
  Text,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Flex,
  Image,
} from "@chakra-ui/react";
import React from "react";
import Sidebar from "../components/Sidebar";
import { FaBars } from "react-icons/fa";
import logo from "../assets/image/logo.png";

const RootLayout = ({ children, title }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <Flex minH={"100vh"}>
      <Box
        width={"25%"}
        display={{ base: "none", md: "block" }}
        bgColor={"white"}
        sx={{
          boxShadow:
            "0 10px 15px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1), 10px 0 15px rgb(0 0 0 / 0.1)",
        }}
        p={5}
      >
        <Sidebar />
      </Box>

      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Image src={logo} w={100} />
          </DrawerHeader>
          <DrawerBody>
            <Sidebar isOpen={isOpen} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Box flex={1} width={"75%"} bgColor={"#ECEBF1"} p={5}>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          mb={5}
        >
          <IconButton
            ref={btnRef}
            onClick={onOpen}
            icon={<FaBars />}
            size={"lg"}
            display={{ base: "block", md: "none" }}
          />
          <Text
            variant={"heading"}
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight={"bold"}
            mb={2}
          >
            {title}
          </Text>
        </Box>

        {children}
      </Box>
    </Flex>
  );
};

export default RootLayout;
