#====================================================================================================
# START - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================

# THIS SECTION CONTAINS CRITICAL TESTING INSTRUCTIONS FOR BOTH AGENTS
# BOTH MAIN_AGENT AND TESTING_AGENT MUST PRESERVE THIS ENTIRE BLOCK

# Communication Protocol:
# If the `testing_agent` is available, main agent should delegate all testing tasks to it.
#
# You have access to a file called `test_result.md`. This file contains the complete testing state
# and history, and is the primary means of communication between main and the testing agent.
#
# Main and testing agents must follow this exact format to maintain testing data. 
# The testing data must be entered in yaml format Below is the data structure:
# 
## user_problem_statement: {problem_statement}
## backend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.py"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## frontend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.js"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## metadata:
##   created_by: "main_agent"
##   version: "1.0"
##   test_sequence: 0
##   run_ui: false
##
## test_plan:
##   current_focus:
##     - "Task name 1"
##     - "Task name 2"
##   stuck_tasks:
##     - "Task name with persistent issues"
##   test_all: false
##   test_priority: "high_first"  # or "sequential" or "stuck_first"
##
## agent_communication:
##     -agent: "main"  # or "testing" or "user"
##     -message: "Communication message between agents"

# Protocol Guidelines for Main agent
#
# 1. Update Test Result File Before Testing:
#    - Main agent must always update the `test_result.md` file before calling the testing agent
#    - Add implementation details to the status_history
#    - Set `needs_retesting` to true for tasks that need testing
#    - Update the `test_plan` section to guide testing priorities
#    - Add a message to `agent_communication` explaining what you've done
#
# 2. Incorporate User Feedback:
#    - When a user provides feedback that something is or isn't working, add this information to the relevant task's status_history
#    - Update the working status based on user feedback
#    - If a user reports an issue with a task that was marked as working, increment the stuck_count
#    - Whenever user reports issue in the app, if we have testing agent and task_result.md file so find the appropriate task for that and append in status_history of that task to contain the user concern and problem as well 
#
# 3. Track Stuck Tasks:
#    - Monitor which tasks have high stuck_count values or where you are fixing same issue again and again, analyze that when you read task_result.md
#    - For persistent issues, use websearch tool to find solutions
#    - Pay special attention to tasks in the stuck_tasks list
#    - When you fix an issue with a stuck task, don't reset the stuck_count until the testing agent confirms it's working
#
# 4. Provide Context to Testing Agent:
#    - When calling the testing agent, provide clear instructions about:
#      - Which tasks need testing (reference the test_plan)
#      - Any authentication details or configuration needed
#      - Specific test scenarios to focus on
#      - Any known issues or edge cases to verify
#
# 5. Call the testing agent with specific instructions referring to test_result.md
#
# IMPORTANT: Main agent must ALWAYS update test_result.md BEFORE calling the testing agent, as it relies on this file to understand what to test next.

#====================================================================================================
# END - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================



#====================================================================================================
# Testing Data - Main Agent and testing sub agent both should log testing data below this section
#====================================================================================================

user_problem_statement: "Crear página web corporativa profesional para Ingeniería Automotriz Ríos con formulario de contacto que guarde mensajes en MongoDB"

backend:
  - task: "API POST /api/contact - Guardar mensajes de contacto"
    implemented: true
    working: true
    file: "server.py, models/contact.py"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: "NA"
          agent: "main"
          comment: "Implementado endpoint POST /api/contact con modelo ContactMessage, validaciones de email, teléfono, nombre y mensaje. Guarda en colección contact_messages de MongoDB. Retorna JSON con success, message y data."
        - working: true
          agent: "testing"
          comment: "✅ TESTED: POST /api/contact funciona correctamente. Validaciones working: email format, name (2-100 chars), phone (10-20 digits only), message (10-1000 chars). Returns 201 with success response. Phone cleaning (removes spaces/dashes) working. Data persisted to MongoDB successfully."
  
  - task: "API GET /api/contact - Obtener mensajes de contacto"
    implemented: true
    working: true
    file: "server.py"
    stuck_count: 0
    priority: "medium"
    needs_retesting: false
    status_history:
        - working: "NA"
          agent: "main"
          comment: "Implementado endpoint GET /api/contact con filtros opcionales (status, limit, skip). Retorna lista de mensajes ordenados por fecha descendente."
        - working: true
          agent: "testing"
          comment: "✅ TESTED: GET /api/contact funciona correctamente. Returns 200 with success response containing array of messages. Retrieved multiple saved messages correctly ordered by created_at descending. JSON structure valid with _id conversion."
  
  - task: "API GET /api/contact/{message_id} - Obtener mensaje específico"
    implemented: true
    working: true
    file: "server.py"
    stuck_count: 0
    priority: "low"
    needs_retesting: false
    status_history:
        - working: "NA"
          agent: "main"
          comment: "Implementado endpoint GET /api/contact/{message_id} para obtener un mensaje específico por ID."
        - working: true
          agent: "testing"
          comment: "✅ TESTED: GET /api/contact/{id} funciona correctamente. Returns 200 for valid IDs with complete message data. Proper 404 handling for non-existent IDs. UUID-based ID system working correctly."

frontend:
  - task: "Integración formulario de contacto con API backend"
    implemented: true
    working: "NA"
    file: "pages/Home.jsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: true
    status_history:
        - working: "NA"
          agent: "main"
          comment: "Integrado formulario con axios POST a /api/contact. Agregado toast de sonner para notificaciones de éxito y error. Estado de loading durante submit. Limpia form después de éxito."
  
  - task: "Toast notifications con Sonner"
    implemented: true
    working: "NA"
    file: "App.js, pages/Home.jsx"
    stuck_count: 0
    priority: "medium"
    needs_retesting: true
    status_history:
        - working: "NA"
          agent: "main"
          comment: "Agregado Toaster component en App.js con position top-right y richColors. Toast success en envío exitoso y toast error con mensaje descriptivo en caso de fallo."

metadata:
  created_by: "main_agent"
  version: "1.0"
  test_sequence: 2
  run_ui: false

test_plan:
  current_focus:
    - "Integración formulario de contacto con API backend"
    - "Toast notifications con Sonner"
  stuck_tasks: []
  test_all: false
  test_priority: "high_first"

agent_communication:
    - agent: "main"
      message: "Backend implementado con endpoints de contacto. Modelo ContactMessage con validaciones (email, phone, name min/max length, message). Frontend integrado con toast notifications. Por favor testear: 1) POST /api/contact con datos válidos e inválidos, 2) GET /api/contact para verificar persistencia, 3) UI del formulario con envío exitoso y errores. BACKEND_URL ya configurado en .env."
    - agent: "testing"
      message: "✅ BACKEND TESTING COMPLETE: All 3 contact API endpoints working perfectly. POST /api/contact: validates all fields correctly (email format, name 2-100 chars, phone 10-20 digits, message 10-1000 chars), saves to MongoDB, returns 201. GET /api/contact: retrieves messages correctly, proper JSON structure. GET /api/contact/{id}: works with valid IDs, proper 404 for invalid IDs. Phone number cleaning (spaces/dashes removal) working. All validations return proper 422 status codes. MongoDB persistence confirmed. Ready for frontend integration testing."
    - agent: "main"
      message: "Iniciando testing frontend. Por favor testear: 1) Scroll al formulario de contacto, 2) Llenar campos con datos válidos (nombre, teléfono, email, mensaje), 3) Submit form, 4) Verificar toast de éxito aparece, 5) Verificar que formulario se limpia después de envío exitoso, 6) Probar con datos inválidos para verificar toast de error."