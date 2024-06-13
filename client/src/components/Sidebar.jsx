import { Box, Flex, Icon, Image } from "@chakra-ui/react";
import logo from "../assets/image/logo.png";
import { Link as ReactRouterLink, useLocation } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { FaUserTie } from "react-icons/fa";
import { MdDashboard, MdWork } from "react-icons/md";
import { ImTree } from "react-icons/im";

const navLinks = [
  { name: "Dashboard", path: "/", Icon: <MdDashboard /> },
  { name: "Employees", path: "/employees", Icon: <FaUserTie /> },
  { name: "Jobs", path: "/jobs", Icon: <MdWork /> },
  { name: "Departments", path: "/departments", Icon: <ImTree /> },
];
const Sidebar = ({ isOpen }) => {
  return (
    <Box>
      {!isOpen && (
        <Box w={20} mb={5}>
          <Image src={logo} />
        </Box>
      )}

      <Flex flexDir={"column"} gap={2}>
        {navLinks.map((link) => {
          const isActive = useLocation().pathname === link.path;
          return (
            <ChakraLink
              p={2}
              bgColor={isActive ? "blue.100" : "transparent"}
              rounded={"md"}
              key={link.name}
              as={ReactRouterLink}
              to={link.path}
              color={isActive ? "blue.500" : "Black"}
              fontWeight={isActive ? "bold" : "normal"}
              _hover={{ color: "blue.500" }}
              display={"flex"}
              alignItems={"center"}
              gap={3}
            >
              {link.Icon} {link.name}
            </ChakraLink>
          );
        })}
      </Flex>
    </Box>
  );
};

export default Sidebar;
