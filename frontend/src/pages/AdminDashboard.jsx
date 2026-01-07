import React, { useState, useEffect } from 'react';
import { ArrowLeft, Mail, Phone, User, Calendar, Filter, RefreshCw, MessageSquare, ExternalLink, LogOut, Settings, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Input } from '../components/ui/input';
import { toast } from 'sonner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [changingPassword, setChangingPassword] = useState(false);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('admin_token');
      const response = await axios.get(`${API}/contact`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.data.success) {
        setMessages(response.data.data);
        toast.success('Mensajes actualizados', {
          duration: 2000,
        });
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      
      if (error.response?.status === 401) {
        toast.error('Sesión expirada', {
          description: 'Por favor inicia sesión nuevamente',
        });
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_username');
        navigate('/login');
      } else {
        toast.error('Error al cargar mensajes', {
          description: 'No se pudieron cargar los mensajes de contacto',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_username');
    toast.success('Sesión cerrada', {
      description: 'Has cerrado sesión correctamente',
    });
    navigate('/login');
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      new: { variant: 'default', label: 'Nuevo', className: 'bg-green-500 hover:bg-green-600' },
      read: { variant: 'secondary', label: 'Leído', className: 'bg-blue-500 hover:bg-blue-600 text-white' },
      replied: { variant: 'outline', label: 'Respondido', className: 'bg-slate-500 hover:bg-slate-600 text-white' },
    };
    const config = statusConfig[status] || statusConfig.new;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const filteredMessages = statusFilter === 'all' 
    ? messages 
    : messages.filter(msg => msg.status === statusFilter);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al sitio
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Panel de Administración</h1>
                <p className="text-sm text-slate-600">Mensajes de contacto recibidos</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-600">
                👤 {localStorage.getItem('admin_username')}
              </span>
              <Button onClick={fetchMessages} disabled={loading} variant="outline" size="sm">
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Actualizar
              </Button>
              <Button onClick={handleLogout} variant="destructive" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar - Lista de mensajes */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Mensajes Recibidos</CardTitle>
                    <CardDescription>
                      Total: {messages.length} mensajes
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={statusFilter === 'all' ? 'default' : 'outline'}
                      onClick={() => setStatusFilter('all')}
                    >
                      Todos
                    </Button>
                    <Button
                      size="sm"
                      variant={statusFilter === 'new' ? 'default' : 'outline'}
                      onClick={() => setStatusFilter('new')}
                    >
                      Nuevos
                    </Button>
                    <Button
                      size="sm"
                      variant={statusFilter === 'read' ? 'default' : 'outline'}
                      onClick={() => setStatusFilter('read')}
                    >
                      Leídos
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-12">
                    <RefreshCw className="w-8 h-8 animate-spin mx-auto text-slate-400 mb-4" />
                    <p className="text-slate-600">Cargando mensajes...</p>
                  </div>
                ) : filteredMessages.length === 0 ? (
                  <div className="text-center py-12">
                    <MessageSquare className="w-12 h-12 mx-auto text-slate-300 mb-4" />
                    <p className="text-slate-600 text-lg font-semibold mb-2">No hay mensajes</p>
                    <p className="text-slate-500 text-sm">
                      {statusFilter === 'all' 
                        ? 'Aún no has recibido ningún mensaje de contacto'
                        : `No hay mensajes con estado "${statusFilter}"`
                      }
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Estado</TableHead>
                          <TableHead>Nombre</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Teléfono</TableHead>
                          <TableHead>Fecha</TableHead>
                          <TableHead>Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredMessages.map((message) => (
                          <TableRow 
                            key={message.id}
                            className={`cursor-pointer hover:bg-slate-50 ${selectedMessage?.id === message.id ? 'bg-blue-50' : ''}`}
                            onClick={() => setSelectedMessage(message)}
                          >
                            <TableCell>{getStatusBadge(message.status)}</TableCell>
                            <TableCell className="font-medium">{message.name}</TableCell>
                            <TableCell className="text-sm text-slate-600">{message.email}</TableCell>
                            <TableCell className="text-sm text-slate-600">{message.phone}</TableCell>
                            <TableCell className="text-sm text-slate-500">
                              {new Date(message.created_at).toLocaleDateString('es-MX')}
                            </TableCell>
                            <TableCell>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedMessage(message);
                                }}
                              >
                                Ver detalles
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Panel de detalles */}
          <div className="lg:col-span-1">
            {selectedMessage ? (
              <Card className="sticky top-24">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Detalles del Mensaje</CardTitle>
                    {getStatusBadge(selectedMessage.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                      <User className="w-4 h-4" />
                      <span>Nombre</span>
                    </div>
                    <p className="font-semibold text-slate-900">{selectedMessage.name}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                      <Mail className="w-4 h-4" />
                      <span>Email</span>
                    </div>
                    <a 
                      href={`mailto:${selectedMessage.email}`}
                      className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                    >
                      {selectedMessage.email}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                      <Phone className="w-4 h-4" />
                      <span>Teléfono</span>
                    </div>
                    <a 
                      href={`tel:${selectedMessage.phone}`}
                      className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                    >
                      {selectedMessage.phone}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                      <Calendar className="w-4 h-4" />
                      <span>Fecha de recepción</span>
                    </div>
                    <p className="text-sm text-slate-700">{formatDate(selectedMessage.created_at)}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                      <MessageSquare className="w-4 h-4" />
                      <span>Mensaje</span>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                        {selectedMessage.message}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200">
                    <p className="text-xs text-slate-500 mb-3">Acciones rápidas</p>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => window.location.href = `mailto:${selectedMessage.email}`}
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Responder
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="flex-1"
                        onClick={() => window.location.href = `tel:${selectedMessage.phone}`}
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Llamar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="sticky top-24">
                <CardContent className="py-12 text-center">
                  <MessageSquare className="w-12 h-12 mx-auto text-slate-300 mb-4" />
                  <p className="text-slate-600 font-medium mb-2">Sin mensaje seleccionado</p>
                  <p className="text-sm text-slate-500">
                    Haz clic en un mensaje de la tabla para ver sus detalles
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Total de mensajes</p>
                  <p className="text-3xl font-bold text-slate-900">{messages.length}</p>
                </div>
                <MessageSquare className="w-12 h-12 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Mensajes nuevos</p>
                  <p className="text-3xl font-bold text-green-600">
                    {messages.filter(m => m.status === 'new').length}
                  </p>
                </div>
                <Mail className="w-12 h-12 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Respondidos</p>
                  <p className="text-3xl font-bold text-slate-600">
                    {messages.filter(m => m.status === 'replied').length}
                  </p>
                </div>
                <User className="w-12 h-12 text-slate-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;