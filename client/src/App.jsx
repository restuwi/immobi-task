import { Card } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"
import Dashboard from "./pages/dashboard"
import Employee from "./pages/employee"
import Job from "./pages/job"
import Department from "./pages/department"
import React from "react"
import useDocumentTitle from "./utils/useDocumentTitle"

const App = () => {
  useDocumentTitle()
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/employees" element={<Employee />} />
      <Route path="/jobs" element={<Job />} />
      <Route path="/departments" element={<Department />} />
    </Routes>
  )
}

export default App