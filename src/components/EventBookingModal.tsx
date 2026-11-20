import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  MapPin,
  Minus,
  Plus,
  Ticket,
  X,
} from 'lucide-react';
import { formatINR, generateDemoBookingId } from '../data/catalog';
import { EventBookingRecord, LiveEvent } from '../types';
import { MediaImage } from './MediaImage';
import { TicketQrCode } from './TicketQrCode';

type EventStep = 'select' | 'summary' | 'confirmation';

interface EventBookingModalProps {
  event: LiveEvent | null;
  onConfirmBooking: (booking: EventBookingRecord) => void;
  onViewMyBookings: () => void;
  onClose: () => void;
}

export function EventBookingModal({
  event,
  onConfirmBooking,
  onViewMyBookings,
  onClose,
}: EventBookingModalProps) {
  const [step, setStep] = useState<EventStep>('select');
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [guestName, setGuestName] = useState('Harpreet Singh');
  const [guestContact, setGuestContact] = useState('harpreet.singh@example.com');
  const [confirmedRecord, setConfirmedRecord] = useState<EventBookingRecord | null>(null);

  useEffect(() => {
    if (event) {
      setStep('select');
      // Default 1 ticket of first tier or 0 so user can immediately interact
      setQuantities({ [event.tiers[0].id]: 1 });
      setConfirmedRecord(null);
    }
  }, [event]);

  useEffect(() => {
    if (!event) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [event, onClose]);

  if (!event) return null;

  const updateQty = (tierId: string, delta: number, maxAvail: number) => {
    setQuantities((prev) => {
      const current = prev[tierId] ?? 0;
      const next = Math.max(0, Math.min(Math.min(6, maxAvail), current + delta));
      return { ...prev, [tierId]: next };
    });
  };

  const selectedItems = event.tiers
    .map((tier) => ({
      tierId: tier.id,
      tierName: tier.name,
      quantity: quantities[tier.id] ?? 0,
      unitPrice: tier.price,
    }))
    .filter((item) => item.quantity > 0);

  const totalTickets = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = selectedItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const convenienceFee = Math.round(subtotal * 0.05);
  const grandTotal = subtotal + convenienceFee;

  const handleConfirm = () => {
    if (totalTickets === 0) return;
    const record: EventBookingRecord = {
      kind: 'event',
      bookingId: generateDemoBookingId('EVT'),
      createdAt: new Date().toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      eventId: event.id,
      eventTitle: event.title,
      artist: event.artist,
      eventImage: event.image,
      category: event.category,
      venue: event.venue,
      city: event.city,
      date: event.date,
      time: event.time,
      items: selectedItems,
      totalTickets,
      subtotal,
      convenienceFee,
      totalAmount: grandTotal,
      guestName: guestName.trim() || 'Guest Attendee',
      guestContact: guestContact.trim() || 'demo@pollywoodtoday.com',
    };

    setConfirmedRecord(record);
    onConfirmBooking(record);
    setStep('confirmation');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 p-0 sm:p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-booking-title"
      onClick={onClose}
    >
      <div
        className="relative flex h-[100dvh] sm:h-auto sm:max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-none sm:rounded-2xl border-0 sm:border border-white/10 bg-[#110F1A] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] bg-[#161322] px-5 py-4">
          <div className="flex items-center gap-3 min-w-0">
            {step === 'summary' && (
              <button
                type="button"
                onClick={() => setStep('select')}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-[#1E1A2E] text-[#CFCADF] hover:text-white"
                aria-label="Back to ticket selection"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
            )}
            <div className="min-w-0">
              <h2
                id="event-booking-title"
                className="font-display text-base sm:text-lg font-bold text-white truncate"
              >
                {event.title}
              </h2>
              <p className="text-xs text-[#A39CB8] truncate">
                {event.artist} · {event.venue}, {event.city}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#A39CB8] hover:bg-white/[0.06] hover:text-white transition-colors"
            aria-label="Close event booking"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          {step === 'select' && (
            <div className="space-y-6">
              {/* Event Banner Summary */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-[220px_1fr]">
                <div className="overflow-hidden rounded-xl border border-white/10 bg-[#181526]">
                  <MediaImage
                    src={event.image}
                    alt={event.title}
                    fallbackTitle={event.title}
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-xs font-medium text-[#D4AF37]">
                    {event.category} · {event.language} · {event.ageLimit}
                  </span>
                  <p className="mt-2 text-sm leading-relaxed text-[#BDB6CF]">{event.description}</p>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-[#DFDAE9]">
                    <span className="inline-flex items-center gap-1.5 tabular-nums">
                      <Calendar className="h-3.5 w-3.5 text-[#D4AF37]" />
                      {event.date} · {event.time}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-[#D4AF37]" />
                      {event.duration}
                    </span>
                  </div>
                </div>
              </div>

              {/* Event Highlights */}
              <div className="grid grid-cols-1 gap-2 rounded-xl border border-white/[0.07] bg-[#161322] p-4 sm:grid-cols-3 text-xs text-[#CFCADF]">
                {event.highlights.map((hl) => (
                  <div key={hl} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#D4AF37]" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>

              {/* Ticket Category Selector */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-sm font-bold text-white">
                    Select Pass Category &amp; Quantity
                  </h3>
                  <span className="text-xs text-[#9F98B2]">Max 6 passes per category</span>
                </div>

                {event.tiers.map((tier) => {
                  const qty = quantities[tier.id] ?? 0;
                  return (
                    <div
                      key={tier.id}
                      className={`flex flex-col justify-between gap-4 rounded-xl border p-4 transition-colors sm:flex-row sm:items-center ${
                        qty > 0
                          ? 'border-[#E11D48]/60 bg-[#1B1528]'
                          : 'border-white/[0.08] bg-[#161322]'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2.5">
                          <h4 className="font-display text-sm font-bold text-white">{tier.name}</h4>
                          <span className="text-xs text-[#9F98B2] tabular-nums">
                            {tier.available} left
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-[#A59EB8]">{tier.description}</p>
                        <p className="mt-2 font-mono text-base font-semibold text-[#D4AF37] tabular-nums">
                          {formatINR(tier.price)}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                        <button
                          type="button"
                          onClick={() => updateQty(tier.id, -1, tier.available)}
                          disabled={qty === 0}
                          aria-label={`Decrease quantity for ${tier.name}`}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/12 bg-[#110E1B] text-white hover:border-white/30 disabled:opacity-35"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-7 text-center font-mono text-sm font-semibold text-white tabular-nums">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQty(tier.id, 1, tier.available)}
                          disabled={qty >= Math.min(6, tier.available)}
                          aria-label={`Increase quantity for ${tier.name}`}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/12 bg-[#110E1B] text-white hover:border-[#E11D48] disabled:opacity-35"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {step === 'summary' && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_300px]">
              <div className="space-y-5">
                <div className="rounded-xl border border-white/[0.08] bg-[#161322] p-4">
                  <h3 className="font-display text-base font-bold text-white">{event.title}</h3>
                  <p className="mt-1 text-xs text-[#D4AF37]">{event.artist}</p>
                  <div className="mt-3 space-y-1 text-xs text-[#B8B2C8]">
                    <p className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-[#E11D48]" />
                      {event.venue}, {event.city}
                    </p>
                    <p className="flex items-center gap-2 tabular-nums">
                      <Calendar className="h-3.5 w-3.5 text-[#D4AF37]" />
                      {event.date} · {event.time}
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-white/[0.08] bg-[#161322] p-5">
                  <h4 className="font-display text-sm font-bold text-white">
                    Attendee Details (Demo Pass)
                  </h4>
                  <div className="mt-4 space-y-4">
                    <div>
                      <label htmlFor="evt-guest-name" className="block text-xs text-[#B8B2C8] mb-1.5">
                        Full Name
                      </label>
                      <input
                        id="evt-guest-name"
                        type="text"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="h-10 w-full rounded-lg border border-white/12 bg-[#0F0D17] px-3.5 text-sm text-white focus:border-[#E11D48] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="evt-guest-contact"
                        className="block text-xs text-[#B8B2C8] mb-1.5"
                      >
                        Email or Phone
                      </label>
                      <input
                        id="evt-guest-contact"
                        type="text"
                        value={guestContact}
                        onChange={(e) => setGuestContact(e.target.value)}
                        className="h-10 w-full rounded-lg border border-white/12 bg-[#0F0D17] px-3.5 text-sm text-white focus:border-[#E11D48] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between rounded-xl border border-white/10 bg-[#171424] p-5">
                <div>
                  <h4 className="font-display text-base font-bold text-white">Order Summary</h4>
                  <div className="mt-4 space-y-3 border-b border-white/[0.08] pb-4 text-sm">
                    {selectedItems.map((item) => (
                      <div key={item.tierId} className="flex items-start justify-between gap-2">
                        <span className="text-xs text-[#CFCADF]">
                          {item.tierName} × {item.quantity}
                        </span>
                        <span className="font-mono text-xs text-white tabular-nums">
                          {formatINR(item.quantity * item.unitPrice)}
                        </span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between text-xs text-[#9F98B2]">
                      <span>Demo Booking Fee (5%)</span>
                      <span className="font-mono tabular-nums">{formatINR(convenienceFee)}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">Total (Demo)</span>
                    <span className="font-mono text-xl font-bold text-white tabular-nums">
                      {formatINR(grandTotal)}
                    </span>
                  </div>
                </div>

                <div className="mt-6 space-y-2.5">
                  <button
                    type="button"
                    onClick={handleConfirm}
                    className="w-full inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#E11D48] px-5 text-sm font-semibold text-white hover:bg-[#BE123C] transition-colors"
                  >
                    <Ticket className="h-4 w-4" />
                    Confirm Demo Passes
                  </button>
                  <p className="text-center text-[11px] text-[#8E86A6]">
                    Frontend demonstration — no real payment is processed.
                  </p>
                </div>
              </div>
            </div>
          )}

          {step === 'confirmation' && confirmedRecord && (
            <div className="mx-auto max-w-2xl space-y-6 py-2">
              <div className="text-center">
                <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h3 className="mt-3 font-display text-2xl font-bold text-white">
                  Event Passes Confirmed
                </h3>
                <p className="mt-1 text-sm text-[#A59EB8]">
                  Your demo event pass is ready inside My Bookings.
                </p>
              </div>

              <div className="overflow-hidden rounded-2xl border border-[#D4AF37]/30 bg-gradient-to-br from-[#1A1429] via-[#13111C] to-[#211224]">
                <div className="flex flex-col justify-between gap-6 p-6 sm:flex-row sm:items-center">
                  <div>
                    <span className="text-xs font-medium text-[#D4AF37]">
                      Pollywood Today · {confirmedRecord.category} Pass
                    </span>
                    <h4 className="mt-1 font-display text-xl font-bold text-white">
                      {confirmedRecord.eventTitle}
                    </h4>
                    <p className="mt-0.5 text-sm text-[#CFCADF]">{confirmedRecord.artist}</p>
                    <p className="mt-2.5 text-xs text-[#A39CB8]">
                      {confirmedRecord.venue}, {confirmedRecord.city}
                    </p>
                    <p className="mt-0.5 text-xs text-[#A39CB8] tabular-nums">
                      {confirmedRecord.date} · {confirmedRecord.time}
                    </p>
                  </div>

                  <div className="flex flex-col items-center border-t border-dashed border-white/15 pt-5 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
                    <TicketQrCode value={confirmedRecord.bookingId} size={108} />
                    <span className="mt-2 font-mono text-xs font-semibold text-[#D4AF37]">
                      {confirmedRecord.bookingId}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 border-t border-white/[0.08] bg-[#0D0B14]/70 px-6 py-4 text-xs sm:grid-cols-3">
                  <div>
                    <span className="block text-[#8C84A4]">Passes Reserved</span>
                    <span className="mt-0.5 block font-medium text-white">
                      {confirmedRecord.items
                        .map((i) => `${i.quantity}× ${i.tierName}`)
                        .join(', ')}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[#8C84A4]">Attendee</span>
                    <span className="mt-0.5 block font-medium text-white">
                      {confirmedRecord.guestName}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[#8C84A4]">Demo Total</span>
                    <span className="mt-0.5 block font-mono font-semibold text-[#D4AF37] tabular-nums">
                      {formatINR(confirmedRecord.totalAmount)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onViewMyBookings();
                  }}
                  className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#E11D48] px-6 text-sm font-semibold text-white hover:bg-[#BE123C] transition-colors"
                >
                  View My Bookings
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex h-11 items-center rounded-lg border border-white/15 bg-[#191627] px-6 text-sm font-medium text-white hover:bg-[#231F36] transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sticky Footer during ticket selection */}
        {step === 'select' && (
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] bg-[#161322] px-5 py-4">
            <div>
              {totalTickets === 0 ? (
                <p className="text-sm text-[#A59EB8]">Select at least 1 pass to continue</p>
              ) : (
                <>
                  <p className="text-xs text-[#A59EB8] tabular-nums">
                    {totalTickets} {totalTickets === 1 ? 'Pass' : 'Passes'} Selected
                  </p>
                  <p className="font-mono text-base font-bold text-white tabular-nums">
                    {formatINR(subtotal)}
                  </p>
                </>
              )}
            </div>

            <button
              type="button"
              disabled={totalTickets === 0}
              onClick={() => setStep('summary')}
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#E11D48] px-6 text-sm font-semibold text-white whitespace-nowrap transition-colors hover:bg-[#BE123C] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Review Summary
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
