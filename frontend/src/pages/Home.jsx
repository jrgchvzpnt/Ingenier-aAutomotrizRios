import React, { useState } from 'react';
import { Phone, MapPin, Clock, Star, Wrench, Gauge, Zap, Settings, Shield, Calendar, ChevronRight, Mail, User, MessageSquare, ExternalLink } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API}/contact`, formData);
      
      if (response.data.success) {
        toast.success('¡Mensaje enviado!', {
          description: 'Gracias por contactarnos. Te responderemos pronto.',
          duration: 5000,
        });
        setFormData({ name: '', phone: '', email: '', message: '' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      
      let errorMessage = 'No pudimos enviar tu mensaje. Intenta nuevamente.';
      
      if (error.response?.data?.detail) {
        if (typeof error.response.data.detail === 'string') {
          errorMessage = error.response.data.detail;
        } else if (Array.isArray(error.response.data.detail)) {
          errorMessage = error.response.data.detail[0]?.msg || errorMessage;
        }
      }
      
      toast.error('Error al enviar mensaje', {
        description: errorMessage,
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/5216677168009', '_blank');
  };

  const handleCall = () => {
    window.location.href = 'tel:6677168009';
  };

  const handleMaps = () => {
    window.open('https://goo.gl/maps/example', '_blank');
  };

  const services = [
    { icon: Gauge, title: 'Diagnóstico Automotriz', description: 'Diagnóstico especializado con equipo de última generación' },
    { icon: Wrench, title: 'Reparación Mecánica', description: 'Reparación general de motor y sistemas mecánicos' },
    { icon: Zap, title: 'Sensores y Electrónica', description: 'Especialistas en sistemas electrónicos y sensores' },
    { icon: Settings, title: 'Sincronización', description: 'Cambio de banda de tiempo y sincronización de motor' },
    { icon: Shield, title: 'Mantenimiento Preventivo', description: 'Servicios programados para mantener tu vehículo en óptimas condiciones' },
    { icon: Calendar, title: 'Mantenimiento Correctivo', description: 'Solución de problemas y reparaciones especializadas' }
  ];

  const process = [
    { step: '01', title: 'Diagnóstico Técnico', description: 'Revisión exhaustiva con equipo especializado' },
    { step: '02', title: 'Explicación Clara', description: 'Te explicamos el problema de forma transparente' },
    { step: '03', title: 'Cotización Transparente', description: 'Presupuesto detallado sin sorpresas' },
    { step: '04', title: 'Reparación Profesional', description: 'Trabajo de calidad con técnicos experimentados' },
    { step: '05', title: 'Entrega y Prueba', description: 'Verificación completa antes de entregar tu vehículo' }
  ];

  const testimonials = [
    { name: 'Jorge Corona', rating: 5, text: 'Excelente servicio y muy fina atención. Lo recomiendo sin ningún problema.' },
    { name: 'Adrian IG', rating: 5, text: 'Buen servicio, no han fallado. Solo hay que sacar cita porque el taller es pequeño.' },
    { name: 'Cliente Verificado', rating: 4, text: 'Buen diagnóstico, aunque el proceso puede tomar tiempo.' }
  ];

  const gallery = [
    { url: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f', alt: 'Trabajo en motor' },
    { url: 'https://images.unsplash.com/photo-1596986952526-3be237187071', alt: 'Taller profesional' },
    { url: 'https://images.unsplash.com/photo-1765638713564-151797d5bae4', alt: 'Motor detallado' },
    { url: 'https://images.unsplash.com/photo-1767339736147-676bd47eddb6', alt: 'Diagnóstico' },
    { url: 'https://images.pexels.com/photos/3757226/pexels-photo-3757226.jpeg', alt: 'Reparación profesional' },
    { url: 'https://images.pexels.com/photos/4315571/pexels-photo-4315571.jpeg', alt: 'Diagnóstico técnico' }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg flex items-center justify-center">
                <Wrench className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Ingeniería Automotriz Ríos</h1>
                <p className="text-xs text-slate-600">Especialistas en Culiacán</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <Button onClick={handleCall} variant="outline" size="sm">
                <Phone className="w-4 h-4 mr-2" />
                667 716 8009
              </Button>
              <Button onClick={handleMaps} size="sm" className="bg-red-600 hover:bg-red-700">
                <MapPin className="w-4 h-4 mr-2" />
                Cómo llegar
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/8986070/pexels-photo-8986070.jpeg" 
            alt="Taller profesional"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-blue-900/90 to-blue-800/85"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-red-600 hover:bg-red-700 text-white">
              <Star className="w-3 h-3 mr-1 fill-current" />
              4.7 de 5 - 38 reseñas en Google
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Ingeniería Automotriz Ríos
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Especialistas en diagnóstico y reparación automotriz profesional en Culiacán
            </p>
            <p className="text-lg text-blue-200 mb-10">
              "Servicio profesional respaldado por la confianza de nuestros clientes"
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={handleCall} size="lg" className="bg-red-600 hover:bg-red-700 text-lg px-8 py-6">
                <Phone className="w-5 h-5 mr-2" />
                Llamar Ahora
              </Button>
              <Button onClick={handleMaps} size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 text-lg px-8 py-6">
                <MapPin className="w-5 h-5 mr-2" />
                Ver Ubicación
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-blue-900" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Dirección</h3>
                <p className="text-slate-600 leading-relaxed">
                  Mariano Escobedo 1719, Miguel Hidalgo<br />
                  80090 Culiacán Rosales, Sinaloa
                </p>
                <p className="text-sm text-slate-500 mt-2">Plus Code: RJ4H+2F</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Teléfono</h3>
                <p className="text-slate-600 text-lg font-semibold">667 716 8009</p>
                <Button onClick={handleCall} variant="link" className="text-red-600 px-0 mt-1">
                  Llamar ahora <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-slate-700" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Horario</h3>
                <p className="text-slate-600">Lunes a Viernes</p>
                <p className="text-lg font-semibold text-slate-900">8:00 AM - 7:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Servicios de Ingeniería Automotriz
            </h2>
            <p className="text-lg text-slate-600">
              Trabajamos bajo diagnóstico previo y atención personalizada. Algunos servicios requieren cita debido a la especialización del taller.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="border-slate-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{service.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Así trabajamos en Ingeniería Automotriz Ríos
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {process.map((item, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-bold text-white">{item.step}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
                </div>
                {index < process.length - 1 && (
                  <ChevronRight className="hidden md:block absolute top-8 -right-3 w-6 h-6 text-red-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              La opinión de nuestros clientes nos respalda
            </h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-8 h-8 text-yellow-500 fill-current" />
                ))}
              </div>
              <span className="text-3xl font-bold text-slate-900">4.7</span>
              <span className="text-slate-600">de 5</span>
            </div>
            <p className="text-slate-600">Basado en 38 reseñas verificadas de Google</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-slate-200">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-700 leading-relaxed mb-4">"{testimonial.text}"</p>
                  <p className="font-semibold text-slate-900">— {testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <Button onClick={handleMaps} variant="outline" size="lg">
              Ver todas las reseñas en Google Maps
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Galería de Trabajos
            </h2>
            <p className="text-lg text-slate-600">
              Conoce algunos de nuestros proyectos y servicios realizados
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map((image, index) => (
              <div key={index} className="relative overflow-hidden rounded-lg aspect-video group cursor-pointer">
                <img 
                  src={image.url} 
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <p className="text-white font-semibold p-4">{image.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-red-600 to-red-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Agenda tu servicio con especialistas
          </h2>
          <p className="text-xl text-red-100 mb-10 max-w-2xl mx-auto">
            Atención profesional en ingeniería automotriz. Se recomienda agendar cita previa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={handleCall} size="lg" className="bg-white text-red-600 hover:bg-slate-100 text-lg px-8 py-6">
              <Phone className="w-5 h-5 mr-2" />
              Llamar para Agendar
            </Button>
            <Button onClick={handleMaps} size="lg" variant="outline" className="border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 text-lg px-8 py-6">
              <MapPin className="w-5 h-5 mr-2" />
              Cómo Llegar al Taller
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Contáctanos
              </h2>
              <p className="text-lg text-slate-600">
                Envíanos un mensaje y te responderemos lo antes posible
              </p>
            </div>
            <Card className="border-slate-200">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Nombre completo
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                      <Input
                        type="text"
                        placeholder="Tu nombre"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Teléfono
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                      <Input
                        type="tel"
                        placeholder="Tu teléfono"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                      <Input
                        type="email"
                        placeholder="tu@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Mensaje
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                      <Textarea
                        placeholder="Cuéntanos en qué podemos ayudarte..."
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="pl-10 min-h-32"
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" size="lg" className="w-full bg-red-600 hover:bg-red-700 text-lg py-6">
                    Enviar Mensaje
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <Wrench className="w-12 h-12 text-blue-900 mx-auto mb-3" />
              <p className="font-bold text-slate-900">Técnicos Experimentados</p>
            </div>
            <div>
              <Star className="w-12 h-12 text-blue-900 mx-auto mb-3" />
              <p className="font-bold text-slate-900">Atención Personalizada</p>
            </div>
            <div>
              <Shield className="w-12 h-12 text-blue-900 mx-auto mb-3" />
              <p className="font-bold text-slate-900">Diagnóstico Honesto</p>
            </div>
            <div>
              <Badge className="w-12 h-12 text-blue-900 mx-auto mb-3" />
              <p className="font-bold text-slate-900">Reputación Comprobada</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Ingeniería Automotriz Ríos</h3>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Especialistas en diagnóstico y reparación automotriz profesional en Culiacán, Sinaloa.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Contacto</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm leading-relaxed">
                    Mariano Escobedo 1719, Miguel Hidalgo<br />
                    80090 Culiacán Rosales, Sinaloa
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-red-500" />
                  <p className="text-sm">667 716 8009</p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Horario</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-red-500" />
                  <p className="text-sm">Lunes a Viernes</p>
                </div>
                <p className="text-lg font-semibold text-white">8:00 AM - 7:00 PM</p>
                <p className="text-sm text-slate-400 mt-4">Se recomienda agendar cita previa</p>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
            <p>© 2025 Ingeniería Automotriz Ríos. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <button
        onClick={handleWhatsApp}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
        aria-label="Contactar por WhatsApp"
      >
        <MessageSquare className="w-8 h-8 text-white" />
        <span className="absolute right-full mr-3 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Escríbenos por WhatsApp
        </span>
      </button>
    </div>
  );
};

export default Home;