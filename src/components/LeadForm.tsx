import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const LEAD_URL = 'https://functions.poehali.dev/3c3bba41-a528-4e2e-9fd0-45e33fd36647';

interface LeadFormProps {
  open: boolean;
  onClose: () => void;
  program?: string;
}

const LeadForm = ({ open, onClose, program }: LeadFormProps) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  if (!open) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) return;
    setStatus('loading');
    try {
      const res = await fetch(LEAD_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, contact, message, program: program || '' }),
      });
      if (!res.ok) throw new Error('fail');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const reset = () => {
    setName('');
    setContact('');
    setMessage('');
    setStatus('idle');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/85 backdrop-blur-sm animate-fade-in" onClick={reset} />
      <div className="glass-card relative z-10 w-full max-w-md rounded-sm p-8 md:p-10 animate-scale-in">
        <button onClick={reset} className="absolute top-5 right-5 text-foreground/50 hover:text-gold transition-colors">
          <Icon name="X" size={22} />
        </button>

        {status === 'success' ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto rounded-full border border-gold/40 flex items-center justify-center text-gold mb-6">
              <Icon name="Check" size={30} />
            </div>
            <h3 className="font-display text-3xl mb-3">Заявка отправлена</h3>
            <p className="text-foreground/60 text-sm leading-relaxed mb-8">
              Спасибо! Я свяжусь с тобой в ближайшее время. Всё складывается в легкости.
            </p>
            <Button onClick={reset} className="bg-gold text-primary-foreground hover:bg-gold/90 rounded-none h-12 px-8 tracking-widest text-xs">
              ЗАКРЫТЬ
            </Button>
          </div>
        ) : (
          <>
            <span className="text-xs tracking-luxe uppercase text-gold/80">Заявка</span>
            <h3 className="font-display text-3xl mt-3 mb-2">Начни путь к себе</h3>
            {program && <p className="text-sm text-gold/70 mb-6">Программа: {program}</p>}
            {!program && <div className="mb-6" />}

            <form onSubmit={submit} className="space-y-4">
              <Input
                placeholder="Твоё имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-background/40 border-gold/25 rounded-none h-12 focus-visible:ring-gold/40"
              />
              <Input
                placeholder="Телефon, Telegram или email"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="bg-background/40 border-gold/25 rounded-none h-12 focus-visible:ring-gold/40"
              />
              <Textarea
                placeholder="Твой запрос (по желанию)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-background/40 border-gold/25 rounded-none min-h-24 focus-visible:ring-gold/40"
              />

              {status === 'error' && (
                <p className="text-sm text-destructive-foreground/90">Не удалось отправить. Попробуй ещё раз.</p>
              )}

              <Button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-gold text-primary-foreground hover:bg-gold/90 rounded-none h-13 py-6 tracking-widest text-xs"
              >
                {status === 'loading' ? 'ОТПРАВЛЯЮ...' : 'ОТПРАВИТЬ ЗАЯВКУ'}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default LeadForm;
