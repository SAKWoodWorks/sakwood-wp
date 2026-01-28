'use client';

import { useState, useEffect, useRef } from 'react';
import type { Locale } from '@/i18n-config';
import { Filter, Building2, Armchair, Ship, Home, Warehouse, ChevronRight, Quote } from 'lucide-react';
import Image from 'next/image';

interface ProjectsGalleryProps {
  lang: Locale;
  dictionary: Record<string, any>;
}

interface Project {
  id: number;
  title: string;
  titleTh: string;
  category: string;
  categoryTh: string;
  description: string;
  descriptionTh: string;
  image: string;
  woodType: string;
  woodTypeTh: string;
  customer: string;
  customerTh: string;
  testimonial: string;
  testimonialTh: string;
}

type ProjectCategory = 'all' | 'construction' | 'furniture' | 'marine' | 'interior';

export function ProjectsGallery({ lang, dictionary }: ProjectsGalleryProps) {
  const [mounted, setMounted] = useState(false);
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ESC key handler to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedProject) {
        closeProjectModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [selectedProject]);

  // Focus trap in modal
  useEffect(() => {
    if (selectedProject && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      if (firstElement) {
        firstElement.focus();
      }
    }
  }, [selectedProject]);

  const projects: Project[] = [
    {
      id: 1,
      title: 'Modern Beach House',
      titleTh: 'บ้านพักตากอากาศสไตล์โมเดิร์น',
      category: 'construction',
      categoryTh: 'ก่อสร้าง',
      description: 'Complete structural wood supply for luxury beachfront property',
      descriptionTh: 'จัดหาไม้โครงสร้างทั้งหมดสำหรับบ้านพักตากอากาศหรูริมทะเล',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
      woodType: 'Structural Pine',
      woodTypeTh: 'ไม้สนโครงสร้าง',
      customer: 'Private Homeowner',
      customerTh: 'เจ้าของบ้านส่วนตัว',
      testimonial: 'Excellent quality wood, delivered on time. Very professional service.',
      testimonialTh: 'ไม้คุณภาพดีมาก จัดส่งตรงเวลา บริการมืออาชีพ'
    },
    {
      id: 2,
      title: 'Luxury Hotel Furniture',
      titleTh: 'เฟอร์นิเจอร์โรงแรมหรู',
      category: 'furniture',
      categoryTh: 'เฟอร์นิเจอร์',
      description: 'Custom furniture for 5-star hotel in Bangkok',
      descriptionTh: 'เฟอร์นิเจอร์สั่งทำพิเศษสำหรับโรงแรม 5 ดาวในกรุงเทพฯ',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
      woodType: 'Premium Teak',
      woodTypeTh: 'ไม้สักเกรดพรีเมียม',
      customer: 'Hotel Chain',
      customerTh: 'เครือโรงแรม',
      testimonial: 'The teak quality is outstanding. Our guests love the furniture.',
      testimonialTh: 'คุณภาพไม้สักยอดเยี่ยม แขกผู้เข้าพักชื่นชอบเฟอร์นิเจอร์มาก'
    },
    {
      id: 3,
      title: 'Traditional Longtail Boat',
      titleTh: 'เรือหางยาวประดับตกแต่ง',
      category: 'marine',
      categoryTh: 'ทางเรือ',
      description: 'Marine-grade teak for boat restoration project',
      descriptionTh: 'ไม้สักเกรดทางเรือสำหรับโครงการบูรณะเรือ',
      image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&q=80',
      woodType: 'Marine Teak',
      woodTypeTh: 'ไม้สักเกรดทางเรือ',
      customer: 'Boat Builder',
      customerTh: 'ช่างต่อเรือ',
      testimonial: 'Best marine teak we have ever used. Highly recommend Sakwood.',
      testimonialTh: 'ไม้สักเกรดทางเรือที่ดีที่สุดที่เคยใช้ แนะนำ Sakwood'
    },
    {
      id: 4,
      title: 'Office Building Interior',
      titleTh: 'ตกแต่งภายในอาคารสำนักงาน',
      category: 'interior',
      categoryTh: 'ตกแต่งภายใน',
      description: 'Wood paneling and flooring for corporate headquarters',
      descriptionTh: 'ไม้ผนังและไม้พื้นสำหรับสำนักงานใหญ่',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      woodType: 'Pine & Teak Mix',
      woodTypeTh: 'ไม้สนและไม้สักผสม',
      customer: 'Corporate Client',
      customerTh: 'ลูกค้าองค์กร',
      testimonial: 'Professional team, quality products, on-time delivery.',
      testimonialTh: 'ทีมงานมืออาชีพ สินค้าคุณภาพ จัดส่งตรงเวลา'
    },
    {
      id: 5,
      title: 'Warehouse Construction',
      titleTh: 'ก่อสร้างโกดัง',
      category: 'construction',
      categoryTh: 'ก่อสร้าง',
      description: 'Structural pine for large-scale warehouse project',
      descriptionTh: 'ไม้สนโครงสร้างสำหรับโครงการโกดังขนาดใหญ่',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
      woodType: 'Structural Pine',
      woodTypeTh: 'ไม้สนโครงสร้าง',
      customer: 'Industrial Client',
      customerTh: 'ลูกค้าอุตสาหกรรม',
      testimonial: 'Reliable supplier with consistent quality. Great pricing.',
      testimonialTh: 'ผู้จัดหาที่เชื่อถือได้ คุณภาพสม่ำเสมอ ราคาดี'
    },
    {
      id: 6,
      title: 'Custom Kitchen Cabinets',
      titleTh: 'ตู้ครัวสั่งทำพิเศษ',
      category: 'furniture',
      categoryTh: 'เฟอร์นิเจอร์',
      description: 'Premium teak cabinets for luxury residence',
      descriptionTh: 'ตู้ไม้สักเกรดพรีเมียมสำหรับที่อยู่อาศัยหรู',
      image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800&q=80',
      woodType: 'Premium Teak',
      woodTypeTh: 'ไม้สักเกรดพรีเมียม',
      customer: 'Interior Designer',
      customerTh: 'นักออกแบบตกแต่งภายใน',
      testimonial: 'Beautiful grain patterns, excellent workability.',
      testimonialTh: 'ลายไม้สวยงาม ขัดเจียะได้ดีมาก'
    }
  ];

  const projectsDict = dictionary?.home?.projects || {
    title: lang === 'th' ? 'ผลงานของเรา' : 'Our Projects',
    subtitle: lang === 'th' ? 'โครงการที่ไว้วางใจ' : 'Trusted by Projects',
    description: lang === 'th' ? 'ดูผลงานโครงการที่เลือกใช้ไม้คุณภาพจาก Sakwood' : 'See projects that trust Sakwood for quality wood materials',
    filter_all: lang === 'th' ? 'ทั้งหมด' : 'All Projects',
    filter_construction: lang === 'th' ? 'ก่อสร้าง' : 'Construction',
    filter_furniture: lang === 'th' ? 'เฟอร์นิเจอร์' : 'Furniture',
    filter_marine: lang === 'th' ? 'ทางเรือ' : 'Marine',
    filter_interior: lang === 'th' ? 'ตกแต่งภายใน' : 'Interior',
    view_details: lang === 'th' ? 'ดูรายละเอียด' : 'View Details',
    have_project: lang === 'th' ? 'มีโครงการที่ต้องการไม้?' : 'Have a Project?',
    have_project_desc: lang === 'th' ? 'ติดต่อเราเพื่อรับคำปรึกษาและราคาสำหรับโครงการของคุณ' : 'Contact us for a free consultation and quote for your project',
    get_quote: lang === 'th' ? 'ขอราคาตอนนี้' : 'Get Free Quote',
    contact_us: lang === 'th' ? 'ติดต่อเรา' : 'Contact Us',
    close: lang === 'th' ? 'ปิด' : 'Close',
    wood_type: lang === 'th' ? 'ประเภทไม้' : 'Wood Type',
    customer: lang === 'th' ? 'ลูกค้า' : 'Customer',
  };

  const filters = [
    { id: 'all', label: projectsDict.filter_all, icon: <Filter className="w-4 h-4" /> },
    { id: 'construction', label: projectsDict.filter_construction, icon: <Building2 className="w-4 h-4" /> },
    { id: 'furniture', label: projectsDict.filter_furniture, icon: <Armchair className="w-4 h-4" /> },
    { id: 'marine', label: projectsDict.filter_marine, icon: <Ship className="w-4 h-4" /> },
    { id: 'interior', label: projectsDict.filter_interior, icon: <Home className="w-4 h-4" /> }
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  const openProjectModal = (project: Project, event: React.MouseEvent<HTMLDivElement>) => {
    triggerRef.current = event.currentTarget as HTMLDivElement;
    setSelectedProject(project);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    // Return focus to triggering element
    if (triggerRef.current) {
      triggerRef.current.focus();
    }
  };

  return (
    <section
      className="relative py-20 lg:py-28 bg-gradient-to-b from-slate-50 to-blue-50 overflow-hidden"
      aria-labelledby="projects-gallery-heading"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232563eb' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide mb-4">
            <Warehouse className="w-4 h-4" />
            {projectsDict.title}
          </div>
          <h2 id="projects-gallery-heading" className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            {projectsDict.subtitle}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {projectsDict.description}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id as ProjectCategory)}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeFilter === filter.id
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:text-gray-900 shadow-md hover:shadow-lg border border-gray-200'
              }`}
            >
              {filter.icon}
              {filter.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer ${
                mounted ? 'animate-in' : 'opacity-0'
              }`}
              onClick={(e) => openProjectModal(project, e)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden relative">
                <Image
                  src={project.image}
                  alt={lang === 'th' ? project.titleTh : project.title}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwABAxX7//Z"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect fill="%23e5e7eb" width="800" height="600"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%236b7280"%3EImage Not Available%3C/text%3E%3C/svg%3E';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <div className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide">
                    {lang === 'th' ? project.categoryTh : project.category}
                  </div>
                </div>

                {/* Wood Type Badge */}
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1.5 rounded-full text-xs font-semibold">
                    {lang === 'th' ? project.woodTypeTh : project.woodType}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {lang === 'th' ? project.titleTh : project.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {lang === 'th' ? project.descriptionTh : project.description}
                </p>

                {/* Customer Quote */}
                <div className="flex items-start gap-2 bg-blue-50 rounded-lg p-3 border border-blue-100">
                  <Quote className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-700 italic leading-relaxed line-clamp-2">
                    "{lang === 'th' ? project.testimonialTh : project.testimonial}"
                  </p>
                </div>

                {/* View Details */}
                <div className="mt-4 flex items-center text-blue-600 font-semibold text-sm group-hover:text-blue-700">
                  {projectsDict.view_details}
                  <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-3xl p-10 lg:p-12 shadow-xl border border-gray-100">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              {projectsDict.have_project}
            </h3>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              {projectsDict.have_project_desc}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`/${lang}/quote`}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {projectsDict.get_quote}
                <ChevronRight className="w-5 h-5" />
              </a>
              <a
                href={`/${lang}/contact`}
                className="inline-flex items-center gap-2 bg-white text-gray-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all duration-300 border border-gray-200"
              >
                {projectsDict.contact_us}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={closeProjectModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            ref={modalRef}
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <Image
                src={selectedProject.image}
                alt={lang === 'th' ? selectedProject.titleTh : selectedProject.title}
                width={800}
                height={600}
                className="w-full h-64 sm:h-96 object-cover"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwABAxX7//Z"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect fill="%23e5e7eb" width="800" height="600"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%236b7280"%3EImage Not Available%3C/text%3E%3C/svg%3E';
                }}
              />
              <button
                onClick={closeProjectModal}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-900 p-2 rounded-full transition-colors"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide">
                  {lang === 'th' ? selectedProject.categoryTh : selectedProject.category}
                </div>
                <div className="bg-amber-600 text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide">
                  {lang === 'th' ? selectedProject.woodTypeTh : selectedProject.woodType}
                </div>
              </div>

              <h2 id="modal-title" className="text-3xl font-bold text-gray-900 mb-4">
                {lang === 'th' ? selectedProject.titleTh : selectedProject.title}
              </h2>

              <p className="text-gray-600 text-lg mb-6">
                {lang === 'th' ? selectedProject.descriptionTh : selectedProject.description}
              </p>

              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100 mb-6">
                <div className="flex items-start gap-3">
                  <Quote className="w-6 h-6 text-blue-600 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">
                      {lang === 'th' ? selectedProject.customerTh : selectedProject.customer}
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      "{lang === 'th' ? selectedProject.testimonialTh : selectedProject.testimonial}"
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <a
                  href={`/${lang}/quote`}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center px-6 py-3 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
                >
                  {lang === 'th' ? 'ขอราคา' : 'Get Quote'}
                </a>
                <button
                  onClick={closeProjectModal}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                >
                  {projectsDict.close}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-in {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
