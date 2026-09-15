export const whatsappNumber = "";

export function createWhatsAppUrl(message: string) {
  const destination = whatsappNumber.replace(/\D/g, "");
  if (!destination) return null;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${destination}?text=${encodedMessage}`;
}

export function getWhatsAppProfileUrl() {
  const destination = whatsappNumber.replace(/\D/g, "");
  return destination ? `https://wa.me/${destination}` : null;
}
