import React, { useEffect, useMemo, useState } from "react";
import {
  Heart,
  User,
  PawPrint,
  Sparkles,
  Cake,
  CalendarDays,
  Dumbbell,
  Home,
} from "lucide-react";

const HEADER_IMAGE = "/marlene-daniel.jpg";

type DiffParts = {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getDiffParts(fromDate: string): DiffParts {
  const start = new Date(fromDate);
  const now = new Date();
  const diffMs = now.getTime() - start.getTime();

  if (Number.isNaN(start.getTime()) || diffMs < 0) {
    return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();

  if (days < 0) {
    months -= 1;
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const totalSeconds = Math.floor(diffMs / 1000);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { years, months, days, hours, minutes, seconds };
}

function daysUntilNextAnnual(dateString: string): number | null {
  if (!dateString) return null;

  const base = new Date(dateString);
  if (Number.isNaN(base.getTime())) return null;

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let next = new Date(now.getFullYear(), base.getMonth(), base.getDate());

  if (next < today) {
    next = new Date(now.getFullYear() + 1, base.getMonth(), base.getDate());
  }

  return Math.ceil((next.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export default function LoveOnePager() {
  const [tick, setTick] = useState(Date.now());

  useEffect(() => {
    const interval = window.setInterval(() => setTick(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  const relationshipStart = "2024-10-10T00:00";

  const marlene = {
    name: "Marlene",
    birthday: "1999-05-20",
    hobbies: ["Pilates", "Poledance", "Fitness"],
    likes: [
      "dein Lachen",
      "deine Empathie",
      "deine boobies",
      "deine Liebe",
      "wie du mich anschaust",
      "wie schön du mein Leben machst",
      "einfach du",
    ],
    special:
      "Das Schönste an dir ist, wie viel Wärme, Leichtigkeit und Herz du in mein Leben bringst.",
  };

  const pet = {
    name: "Don Camillo",
    species: "Zwerghamster",
    description: "Klein, süß und ein wichtiger Teil unserer kleinen Familie.",
  };

  const together = useMemo(() => getDiffParts(relationshipStart), [tick]);

  const highlights = [
    {
      label: "Marlenes Geburtstag",
      date: "20.05.1999",
      days: daysUntilNextAnnual(marlene.birthday),
      tone: "rose" as const,
    },
    {
      label: "Daniels Geburtstag",
      date: "06.09.1993",
      days: daysUntilNextAnnual("1993-09-06"),
      tone: "sky" as const,
    },
    {
      label: "Jahrestag",
      date: "10.10.2024",
      days: daysUntilNextAnnual(relationshipStart),
      tone: "rose" as const,
    },
  ]
    .filter(
      (item): item is { label: string; date: string; days: number; tone: "rose" | "sky" } =>
        item.days !== null
    )
    .sort((a, b) => a.days - b.days);

  console.assert(typeof together.years === "number", "years should be a number");
  console.assert(typeof together.seconds === "number", "seconds should be a number");
  console.assert(daysUntilNextAnnual(relationshipStart) !== null, "anniversary should be calculable");
  console.assert(highlights.length >= 1, "highlights should exist");

  return (
    <div className="min-h-screen bg-[#f3efec] px-4 py-8 text-[#3c302d] md:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <section className="relative overflow-hidden rounded-[2rem] border border-white/40 bg-[#caa5a0] shadow-xl">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-35"
            style={{ backgroundImage: `url(${HEADER_IMAGE})` }}
          />
          <div className="absolute inset-0 bg-[#7d5752]/45 backdrop-blur-[2px]" />

          <div className="relative flex flex-col items-center px-6 py-10 text-center text-white md:px-10 md:py-14">
            <div className="mb-5 h-40 w-40 overflow-hidden rounded-full border-4 border-white shadow-2xl md:h-52 md:w-52">
              <img src={HEADER_IMAGE} alt="du und ich" className="h-full w-full object-cover" />
            </div>

            <div className="absolute left-10 top-16 text-4xl text-rose-200/90">♡</div>
            <div className="absolute right-12 top-20 text-4xl text-rose-200/90">♡</div>

            <h1 className="font-serif text-6xl leading-none md:text-7xl">du &amp; ich</h1>
            <div className="mt-4 flex items-center gap-3 text-rose-100">
              <div className="h-px w-16 bg-rose-100/70" />
              <Heart className="h-5 w-5 fill-current" />
              <div className="h-px w-16 bg-rose-100/70" />
            </div>
            <p className="mt-4 text-2xl text-rose-50">Seit dem 10.10.2024</p>
          </div>
        </section>

        <section className="rounded-[1.8rem] border border-[#e8ddd7] bg-white/90 p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-center gap-2 font-serif text-3xl text-[#5a423e]">
            <Heart className="h-5 w-5 text-[#ca8886]" />
            <span>Unsere gemeinsame Zeit</span>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-6 md:gap-0">
            {[
              [together.years, "Jahre"],
              [together.months, "Monate"],
              [together.days, "Tage"],
              [together.hours, "Stunden"],
              [together.minutes, "Minuten"],
              [together.seconds, "Sekunden"],
            ].map(([value, label], index) => (
              <div
                key={String(label)}
                className={`flex flex-col items-center justify-center rounded-2xl py-3 text-center md:rounded-none ${
                  index < 5 ? "md:border-r md:border-[#eadfda]" : ""
                }`}
              >
                <div className="text-5xl md:text-6xl font-serif font-bold tracking-tight text-[#c47a7b]">
                  {value}
                </div>
                <div className="mt-3 text-sm uppercase tracking-[0.22em] text-[#6a5551]">{label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-3">
          <article className="rounded-[1.8rem] border border-[#e8ddd7] bg-white/90 p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2 font-serif text-2xl text-[#4d3835]">
              <User className="h-5 w-5 text-[#c47a7b]" />
              <span>Über Marlene</span>
            </div>
            <div className="space-y-5 text-[#4f403d]">
              <div className="flex gap-3">
                <Cake className="mt-1 h-5 w-5 text-[#b87a78]" />
                <div>
                  <p className="font-medium">Geburtstag</p>
                  <p className="text-lg">20.05.1999</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Sparkles className="mt-1 h-5 w-5 text-[#b87a78]" />
                <div>
                  <p className="font-medium">Das macht dich besonders</p>
                  <p className="leading-relaxed text-[#6b5a56]">{marlene.special}</p>
                </div>
              </div>
            </div>
          </article>

          <article className="rounded-[1.8rem] border border-[#e8ddd7] bg-white/90 p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2 font-serif text-2xl text-[#4d3835]">
              <Heart className="h-5 w-5 text-[#c47a7b]" />
              <span>Ich liebe an dir</span>
            </div>
            <div className="space-y-3 text-[#4f403d]">
              {marlene.likes.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Heart className="mt-1 h-4 w-4 shrink-0 fill-current text-[#d99293]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[1.8rem] border border-[#e8ddd7] bg-white/90 p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2 font-serif text-2xl text-[#4d3835]">
              <Dumbbell className="h-5 w-5 text-[#c47a7b]" />
              <span>Deine Hobbies</span>
            </div>
            <div className="space-y-5 text-[#4f403d]">
              {marlene.hobbies.map((item) => (
                <div key={item} className="flex items-center gap-3 text-xl">
                  <Sparkles className="h-4 w-4 text-[#c47a7b]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
          <article className="rounded-[1.8rem] border border-[#e8ddd7] bg-white/90 p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-2 font-serif text-2xl text-[#4d3835]">
              <PawPrint className="h-5 w-5 text-[#c47a7b]" />
              <span>Unser Familienmitglied</span>
            </div>

            <div className="grid items-center gap-5 md:grid-cols-[180px_1fr_170px]">
              <div className="mx-auto h-40 w-40 overflow-hidden rounded-full bg-[#ead7c8] shadow-inner">
                <img src="/camillo.jpg" alt="Don Camillo" className="h-full w-full object-cover" />
              </div>

              <div className="space-y-3 text-[#4f403d]">
                <div>
                  <h3 className="text-4xl font-serif text-[#4b3936]">
                    {pet.name} <span className="text-[#d08a8b]">♡</span>
                  </h3>
                  <p className="mt-1 text-2xl text-[#6a5956]">{pet.species}</p>
                </div>
                <div className="h-px w-12 bg-[#d9c6bf]" />
                <p className="max-w-sm text-lg leading-relaxed text-[#6b5a56]">{pet.description}</p>
              </div>

              <div className="text-center text-[#7a605b]">
                <Home className="mx-auto mb-3 h-20 w-20 text-[#9b6c66]" />
                <p className="text-2xl leading-snug">Ein Zuhause.</p>
                <p className="text-2xl leading-snug">Eine Familie.</p>
                <p className="text-2xl leading-snug">Wir.</p>
                <div className="mt-2 text-2xl text-[#d08a8b]">♡</div>
              </div>
            </div>
          </article>

          <article className="rounded-[1.8rem] border border-[#e8ddd7] bg-white/90 p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-2 font-serif text-2xl text-[#4d3835]">
              <CalendarDays className="h-5 w-5 text-[#c47a7b]" />
              <span>Nächste Momente</span>
            </div>

            <div className="space-y-4">
              {highlights.map((item) => (
                <div key={item.label} className="flex items-start gap-4 rounded-2xl p-2">
                  <div
                    className={`mt-1 flex h-12 w-12 items-center justify-center rounded-full ${
                      item.tone === "rose" ? "bg-rose-200 text-rose-700" : "bg-sky-200 text-sky-700"
                    }`}
                  >
                    <Cake className="h-5 w-5" />
                  </div>
                  <div className="flex-1 border-b border-[#eadfda] pb-4 last:border-b-0 last:pb-0">
                    <p className="text-2xl font-medium text-[#4f403d]">{item.label}</p>
                    <p className="text-xl text-[#6e5b57]">{item.date}</p>
                    <p
                      className={`mt-1 text-2xl ${
                        item.tone === "rose" ? "text-rose-500" : "text-sky-500"
                      }`}
                    >
                      in {item.days} Tagen
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="rounded-[1.6rem] border border-[#ead9d8] bg-[#f1dfdf] px-6 py-5 text-center shadow-sm">
          <div className="flex flex-col items-center justify-center gap-3 md:flex-row md:gap-6">
            <Heart className="h-12 w-12 fill-current text-[#e18f8f]" />
            <p className="font-serif text-3xl text-[#5d4643] md:text-4xl">
              Das schönste, was mir im Leben passiert ist, bist du.
            </p>
          </div>
          <div className="mt-3 text-[#d08a8b]">♡</div>
        </section>
      </div>
    </div>
  );
}
