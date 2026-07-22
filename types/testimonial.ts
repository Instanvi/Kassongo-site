export interface ITestimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  rating?: number;
  location?: string;
  avatar?: string;
  companyLogo?: string;
  color: "green" | "blue" | "purple" | "orange" | "teal";
}

export const GLOBAL_TESTIMONIALS_DATA: ITestimonial[] = [
  {
    id: "testimonial-1",
    quote: "Before Kassongo, cross-border shipping duties and hidden fees were losing us international buyers. With Kassongo Checkout and Landed Cost, our global order completion rate tripled within weeks!",
    author: "Heather Phillips",
    role: "Customer Success Lead",
    company: "Tiller Money",
    rating: 5,
    location: "Global",
    color: "green",
  },
  {
    id: "testimonial-2",
    quote: "Kassongo's assisted sourcing and express forwarding transformed how we source goods from Guangzhou & Dubai directly to Lagos and Nairobi with 100% duty transparency and zero hassle.",
    author: "David Mensah",
    role: "Operations Director",
    company: "AfriStyle Fashion",
    rating: 5,
    location: "Nigeria & Kenya",
    color: "blue",
  },
  {
    id: "testimonial-3",
    quote: "Mobile Money integration combined with Kassongo's secure warehousing gave our international buyers total confidence. Over 70% of our orders now use Kassongo payment & trade routes.",
    author: "Sarah Okoye",
    role: "CEO & Founder",
    company: "Diaspora Commerce",
    rating: 5,
    location: "United Kingdom",
    color: "purple",
  },
  {
    id: "testimonial-4",
    quote: "Zero fraudulent chargebacks across $2M+ in cross-border trade transactions. Kassongo's compliance, HS code lookup, and automated landed cost calculations are indispensable to our business.",
    author: "Marcus van der Berg",
    role: "Financial Controller",
    company: "Cape Town Electronics",
    rating: 5,
    location: "South Africa",
    color: "orange",
  },
  {
    id: "testimonial-5",
    quote: "Consolidating multi-vendor shipments through Kassongo's global logistics hubs saved our business 45% on air freight costs. It is the ultimate end-to-end platform for global trade.",
    author: "Jean-Baptiste Koffi",
    role: "Founder & MD",
    company: "Abidjan Import-Export",
    rating: 4,
    location: "Côte d'Ivoire",
    color: "teal",
  },
];

export class Testimonial implements ITestimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  location?: string;
  avatar?: string;
  companyLogo?: string;
  color: "green" | "blue" | "purple" | "orange" | "teal";

  constructor(data: ITestimonial) {
    this.id = data.id;
    this.quote = data.quote;
    this.author = data.author;
    this.role = data.role;
    this.company = data.company;
    this.rating = data.rating ?? 5;
    this.location = data.location;
    this.avatar = data.avatar;
    this.companyLogo = data.companyLogo;
    this.color = data.color;
  }

  get fullTitle(): string {
    return `${this.author} — ${this.role}, ${this.company}`;
  }

  static getGlobalTestimonials(): Testimonial[] {
    return GLOBAL_TESTIMONIALS_DATA.map((data) => new Testimonial(data));
  }

  static getTestimonialById(id: string): Testimonial | undefined {
    const found = GLOBAL_TESTIMONIALS_DATA.find((item) => item.id === id);
    return found ? new Testimonial(found) : undefined;
  }
}
