import type { Locale } from '@/i18n-config';

interface AboutTeamProps {
  lang: Locale;
  dictionary: {
    about: {
      team_title: string;
      team_subtitle: string;
      team_member1_name: string;
      team_member1_role: string;
      team_member2_name: string;
      team_member2_role: string;
      team_member3_name: string;
      team_member3_role: string;
    };
  };
}

export function AboutTeam({ lang, dictionary }: AboutTeamProps) {
  const { about } = dictionary;

  const team = [
    {
      name: about.team_member1_name,
      role: about.team_member1_role,
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
    },
    {
      name: about.team_member2_name,
      role: about.team_member2_role,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
    },
    {
      name: about.team_member3_name,
      role: about.team_member3_role,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    },
  ];

  return (
    <section className="py-20 bg-gray-50" aria-labelledby="about-team-heading">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2
            id="about-team-heading"
            className="text-3xl md:text-4xl font-bold text-blue-900 mb-4"
          >
            {about.team_title}
          </h2>
          <p className="text-blue-600 font-semibold max-w-2xl mx-auto">
            {about.team_subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden group"
            >
              <div className="aspect-square bg-gray-200 overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundImage: `url('${member.image}')` }}
                  role="img"
                  aria-label={`${member.name} - ${member.role}`}
                ></div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-blue-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
