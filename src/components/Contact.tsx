import { useState, useRef, type FormEvent } from 'react';
import {
  Check,
  Copy,
  Github,
  Mail,
  MapPin,
  MessageCircle,
  ArrowUpRight,
  Sparkles,
  Send,
  Loader2,
  AlertCircle,
  CheckCircle2,
  MailQuestion,
} from 'lucide-react';
import { contacto, profile } from '../data/portfolioData';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

type ReasonType = 'freelance' | 'hibrido' | 'empleo' | 'consulta';

export function Contact() {
  const [copiado, setCopiado] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  // Estados del Formulario
  const [nombre, setNombre] = useState('');
  const [correoOContacto, setCorreoOContacto] = useState('');
  const [motivo, setMotivo] = useState<ReasonType>('freelance');
  const [mensaje, setMensaje] = useState('');

  // Estado de envío
  const [status, setStatus] = useState<
    'idle' | 'submitting' | 'success' | 'needs-activation' | 'error'
  >('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const motivoLabels: Record<ReasonType, string> = {
    freelance: 'Proyecto Freelance',
    hibrido: 'Oportunidad Híbrida',
    empleo: 'Contrato de Software',
    consulta: 'Consulta Técnica',
  };

  const copiarCorreo = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(profile.email);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = profile.email;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
      }

      setCopiado(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopiado(false), 2500);
    } catch {
      setCopiado(false);
    }
  };

  const armarTextoMensaje = () => {
    const saludo = nombre ? `Hola Jorman, soy ${nombre}.` : 'Hola Jorman, vi tu portafolio.';
    const motivoTexto = `Motivo: ${motivoLabels[motivo]}.`;
    const contactoTexto = correoOContacto ? `Mi contacto: ${correoOContacto}.` : '';
    const cuerpo = mensaje ? `Mensaje: ${mensaje}` : 'Me gustaría hablar contigo sobre una oportunidad técnica.';

    return `${saludo}\n${motivoTexto}\n${contactoTexto}\n${cuerpo}`.trim();
  };

  // Envío de Correo Electrónico con soporte para activación y fallback inteligente
  const handleSubmitEmail = async (e: FormEvent) => {
    e.preventDefault();

    if (!nombre.trim() || !correoOContacto.trim() || !mensaje.trim()) {
      setErrorMsg('Por favor completa los campos de nombre, contacto y mensaje.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    // Si el usuario abrió el archivo localmente como file:// en lugar de un servidor http://
    if (window.location.protocol === 'file:') {
      // Usamos el cliente de correo directo para evitar bloqueo del navegador
      const asunto = `[Portafolio] ${motivoLabels[motivo]} - ${nombre.trim()}`;
      const cuerpo = armarTextoMensaje();
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
        asunto
      )}&body=${encodeURIComponent(cuerpo)}`;
      setStatus('success');
      return;
    }

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          Nombre: nombre.trim(),
          Contacto: correoOContacto.trim(),
          TipoDeOportunidad: motivoLabels[motivo],
          Mensaje: mensaje.trim(),
          _subject: `[Portafolio Web] ${motivoLabels[motivo]} - ${nombre.trim()}`,
          _template: 'box',
          _captcha: 'false',
        }),
      });

      const data = await response.json();

      // FormSubmit envía un email de activación la primera vez
      if (
        data.message &&
        (data.message.includes('needs Activation') ||
          data.message.includes('Activate Form') ||
          data.message.includes('activation'))
      ) {
        setStatus('needs-activation');
        return;
      }

      if (response.ok && (data.success === 'true' || data.success === true)) {
        setStatus('success');
        setNombre('');
        setCorreoOContacto('');
        setMensaje('');
      } else {
        throw new Error(data.message || 'No fue posible completar el envío por correo.');
      }
    } catch (err: unknown) {
      console.warn('Fallo en la llamada AJAX de correo:', err);
      // Fallback elegante: Abrir cliente de correo o WhatsApp
      setErrorMsg(
        'El servidor de correo no pudo responder por AJAX en este entorno. Puedes hacer clic en "Abrir en mi Correo" o enviarlo por WhatsApp.'
      );
      setStatus('error');
    }
  };

  const enviarMailtoFallback = () => {
    const asunto = `[Portafolio] ${motivoLabels[motivo]} - ${nombre || 'Nuevo Contacto'}`;
    const cuerpo = armarTextoMensaje();
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      asunto
    )}&body=${encodeURIComponent(cuerpo)}`;
  };

  const enviarWhatsApp = () => {
    const texto = armarTextoMensaje();
    const url = `${profile.whatsapp}?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contacto" className="section-padding relative overflow-hidden pb-32 sm:pb-36">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow="07 / Conexión Profesional"
            title={
              <>
                Iniciemos un <span className="gradient-text">Proyecto</span>
              </>
            }
            description="Completa el formulario y tu mensaje llegará directamente a mi correo electrónico personal (yormancardona10@gmail.com) o escríbeme por WhatsApp."
            centered
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="relative mx-auto mt-12 max-w-4xl">
            {/* Resplandor ambiental de fondo */}
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-3xl opacity-50 blur-3xl pointer-events-none"
              style={{
                background:
                  'conic-gradient(from 180deg, rgba(163,230,53,0.18), rgba(34,211,238,0.14), rgba(167,139,250,0.12), rgba(163,230,53,0.18))',
              }}
            />

            <div className="glass-card relative overflow-hidden p-7 sm:p-11 border border-white/[0.12] backdrop-blur-2xl">
              {/* Header de Estado */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
                <div className="badge-shimmer inline-flex items-center gap-2 rounded-full border border-lime/30 px-3.5 py-1.5 font-mono text-[11px] font-bold text-lime">
                  <span className="h-2 w-2 rounded-full bg-lime animate-ping" />
                  RESPUESTA RÁPIDA · DISPONIBLE
                </div>

                <div className="flex items-center gap-2 font-mono text-xs text-muted">
                  <MapPin size={14} className="text-cyan" />
                  <span>{profile.ubicacion}</span>
                </div>
              </div>

              {/* Pitch de Contacto */}
              <div className="mt-7">
                <h3 className="text-xl sm:text-2xl font-bold text-ink leading-relaxed">
                  {contacto.cta}
                </h3>
              </div>

              {/* Formulario 100% Funcional */}
              <form onSubmit={handleSubmitEmail} className="mt-8 rounded-2xl border border-white/[0.08] bg-surface/80 p-5 sm:p-7">
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-5">
                  <span className="flex items-center gap-2 font-mono text-xs text-lime font-bold">
                    <Sparkles size={14} />
                    <span>Formulario de Contacto Directo</span>
                  </span>
                  <span className="font-mono text-[11px] text-muted">
                    Destino: {profile.email}
                  </span>
                </div>

                {/* Mensaje de Paso de Activación Requerido por FormSubmit */}
                {status === 'needs-activation' && (
                  <div className="mb-6 rounded-xl border border-cyan/40 bg-cyan/10 p-5 text-xs font-mono text-cyan animate-fade-in flex items-start gap-3.5 shadow-glow-cyan">
                    <MailQuestion size={22} className="shrink-0 mt-0.5 text-cyan" />
                    <div>
                      <p className="font-bold text-sm text-ink">
                        📩 ¡Paso final: Activa la recepción de correos en tu Gmail!
                      </p>
                      <p className="mt-2 text-subtle leading-relaxed">
                        FormSubmit te acaba de enviar un correo a <strong>{profile.email}</strong> con el asunto <em>"Action Required: Activate Form"</em>.
                      </p>
                      <p className="mt-1 text-subtle leading-relaxed">
                        Abre ese correo en tu Gmail (revisa también tu carpeta de spam o promociones) y haz clic en el botón verde <strong>"Activate Form"</strong>.
                      </p>
                      <p className="mt-2 text-lime font-bold">
                        ✦ Solo debes hacer clic una única vez. ¡A partir de ese momento todos los mensajes de reclutadores y clientes llegarán directo a tu bandeja de entrada!
                      </p>
                    </div>
                  </div>
                )}

                {/* Mensaje de Éxito Normal */}
                {status === 'success' && (
                  <div className="mb-6 rounded-xl border border-lime/40 bg-lime/10 p-4 text-xs font-mono text-lime animate-fade-in flex items-start gap-3 shadow-glow-lime">
                    <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-sm">¡Mensaje enviado con éxito!</p>
                      <p className="mt-1 text-subtle leading-relaxed">
                        Tu información ha sido enviada directamente a <strong>{profile.email}</strong>. Te responderé a la mayor brevedad posible.
                      </p>
                    </div>
                  </div>
                )}

                {/* Mensaje de Error / Fallback */}
                {status === 'error' && (
                  <div className="mb-6 rounded-xl border border-rose/40 bg-rose/10 p-4 text-xs font-mono text-rose animate-fade-in flex items-start gap-3">
                    <AlertCircle size={18} className="shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-bold text-sm">Opciones de entrega directa</p>
                      <p className="mt-1 text-subtle leading-relaxed">{errorMsg}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={enviarMailtoFallback}
                          className="rounded-lg border border-cyan/40 bg-cyan/20 px-3 py-1 font-mono text-xs font-bold text-cyan hover:bg-cyan/30"
                        >
                          Abrir en mi Correo
                        </button>
                        <button
                          type="button"
                          onClick={enviarWhatsApp}
                          className="rounded-lg border border-lime/40 bg-lime/20 px-3 py-1 font-mono text-xs font-bold text-lime hover:bg-lime/30"
                        >
                          Enviar por WhatsApp
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="nombre" className="font-mono text-xs text-subtle block mb-1.5 font-semibold">
                      Tu Nombre o Empresa *
                    </label>
                    <input
                      id="nombre"
                      type="text"
                      required
                      disabled={status === 'submitting'}
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      placeholder="Ej. Carlos Restrepo / Empresa X"
                      className="w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-2.5 font-mono text-xs text-ink outline-none transition-colors focus:border-lime/40 placeholder:text-dim disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label htmlFor="correo" className="font-mono text-xs text-subtle block mb-1.5 font-semibold">
                      Tu Correo o Teléfono *
                    </label>
                    <input
                      id="correo"
                      type="text"
                      required
                      disabled={status === 'submitting'}
                      value={correoOContacto}
                      onChange={(e) => setCorreoOContacto(e.target.value)}
                      placeholder="Ej. contacto@empresa.com o +57 300..."
                      className="w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-2.5 font-mono text-xs text-ink outline-none transition-colors focus:border-lime/40 placeholder:text-dim disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Motivo de contacto */}
                <div className="mt-4">
                  <label className="font-mono text-xs text-subtle block mb-2 font-semibold">
                    Tipo de Oportunidad
                  </label>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 font-mono text-xs">
                    {(['freelance', 'hibrido', 'empleo', 'consulta'] as ReasonType[]).map((r) => (
                      <button
                        key={r}
                        type="button"
                        disabled={status === 'submitting'}
                        onClick={() => setMotivo(r)}
                        className={`rounded-xl border py-2 px-3 text-center transition-all ${
                          motivo === r
                            ? 'border-lime/40 bg-lime/15 text-lime font-bold shadow-glow-lime'
                            : 'border-white/[0.06] bg-white/[0.02] text-muted hover:border-white/15 hover:text-ink'
                        }`}
                      >
                        {motivoLabels[r]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mensaje */}
                <div className="mt-4">
                  <label htmlFor="mensaje" className="font-mono text-xs text-subtle block mb-1.5 font-semibold">
                    Detalles del Proyecto o Mensaje *
                  </label>
                  <textarea
                    id="mensaje"
                    rows={4}
                    required
                    disabled={status === 'submitting'}
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    placeholder="Cuéntame sobre el proyecto, requerimientos técnicos o vacante que tienes disponible..."
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-2.5 font-mono text-xs text-ink outline-none transition-colors focus:border-lime/40 placeholder:text-dim resize-none disabled:opacity-50"
                  />
                </div>

                {/* Botones de Envío */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="btn-primary !py-3.5 flex-1 min-w-[200px] font-mono text-xs disabled:opacity-50 cursor-pointer"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Enviando mensaje...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Enviar Mensaje a mi Correo</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={enviarWhatsApp}
                    className="btn-ghost !py-3.5 flex-1 min-w-[200px] font-mono text-xs hover:border-lime/40 hover:text-lime cursor-pointer"
                  >
                    <MessageCircle size={16} className="text-lime" />
                    <span>Escribir por WhatsApp</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </form>

              {/* Botones de Respaldo Rápido */}
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={copiarCorreo}
                  className="btn-ghost !py-3.5 font-mono text-xs"
                >
                  {copiado ? (
                    <>
                      <Check size={16} className="text-lime" />
                      <span className="text-lime">¡Copiado: {profile.email}!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={16} className="text-muted" />
                      <span>Copiar {profile.email}</span>
                    </>
                  )}
                </button>

                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost !py-3.5 font-mono text-xs"
                >
                  <Github size={16} className="text-violet" />
                  <span>Ver GitHub Oficial</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>

              {/* Pie de Datos */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-6 font-mono text-xs text-muted">
                <span className="flex items-center gap-1.5 text-lime">
                  <Mail size={14} />
                  {profile.email}
                </span>
                <span className="text-subtle">{profile.telefono}</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
