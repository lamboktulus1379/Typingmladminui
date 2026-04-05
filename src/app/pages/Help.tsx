import { useState } from "react";
import { HelpCircle, Search, Book, Video, MessageCircle, FileText, Mail, Phone, ChevronDown, ChevronUp } from "lucide-react";

const faqData = [
  {
    id: 1,
    category: "Getting Started",
    question: "How do I create a new user?",
    answer: "Navigate to the Users page from the sidebar, click the 'Create User' button, fill in the required information including first name, last name, email, and role, then click 'Save'. The user will receive an email with their login credentials.",
  },
  {
    id: 2,
    category: "Getting Started",
    question: "How do I assign drills to users?",
    answer: "Go to the Drill Library page, select a drill from the list, and click the 'Assign' button. Choose the users you want to assign the drill to and set the difficulty level. The system will track their progress automatically.",
  },
  {
    id: 3,
    category: "Analytics",
    question: "What does WPM mean?",
    answer: "WPM stands for Words Per Minute. It's a standard metric for measuring typing speed. The system calculates WPM by dividing the number of characters typed by 5 (average word length) and then dividing by the time in minutes.",
  },
  {
    id: 4,
    category: "Analytics",
    question: "How is accuracy calculated?",
    answer: "Accuracy is calculated as the percentage of correct keystrokes out of total keystrokes. For example, if a user types 100 characters and makes 5 mistakes, their accuracy is 95%.",
  },
  {
    id: 5,
    category: "ML Recommendations",
    question: "How does the ML recommendation engine work?",
    answer: "Our Machine Learning engine analyzes user performance data including accuracy per finger, common mistakes, and improvement trends. It then suggests personalized drills targeting weak areas with a confidence score indicating the likelihood of improvement.",
  },
  {
    id: 6,
    category: "ML Recommendations",
    question: "What is ML confidence score?",
    answer: "The confidence score (0-100%) indicates how certain the ML model is about a recommendation. Scores above 90% are highly reliable, 80-90% are moderately reliable, and below 80% should be reviewed before implementation.",
  },
  {
    id: 7,
    category: "Technical",
    question: "How do I export data?",
    answer: "You can export data from most pages using the 'Export' button. Data is exported in CSV or XLSX format. For bulk exports, go to Settings > Data Management > Export All Data.",
  },
  {
    id: 8,
    category: "Technical",
    question: "What browsers are supported?",
    answer: "Typing Coach ML is optimized for modern browsers including Chrome 90+, Firefox 88+, Safari 14+, and Edge 90+. For the best experience, we recommend using the latest version of Chrome or Firefox.",
  },
];

const quickLinks = [
  { icon: Book, title: "Documentation", description: "Complete admin guide", color: "text-blue-600", bgColor: "bg-blue-50" },
  { icon: Video, title: "Video Tutorials", description: "Step-by-step guides", color: "text-purple-600", bgColor: "bg-purple-50" },
  { icon: MessageCircle, title: "Community Forum", description: "Ask the community", color: "text-emerald-600", bgColor: "bg-emerald-50" },
  { icon: FileText, title: "API Reference", description: "Developer docs", color: "text-amber-600", bgColor: "bg-amber-50" },
];

export function Help() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(faqData.map(faq => faq.category)))];
  
  const filteredFaqs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <HelpCircle className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-semibold text-slate-800">Help Center</h1>
        </div>
        <p className="text-slate-500">Find answers, tutorials, and get support</p>
      </div>

      {/* Search Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 shadow-lg mb-6">
        <h2 className="text-white text-2xl font-bold mb-4 text-center">How can we help you?</h2>
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search for help articles, guides, or FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-white/50 shadow-xl"
          />
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {quickLinks.map((link) => {
          const Icon = link.icon;
          return (
            <button
              key={link.title}
              className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all text-left group"
            >
              <div className={`w-12 h-12 rounded-lg ${link.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className={`w-6 h-6 ${link.color}`} />
              </div>
              <h3 className="font-semibold text-slate-800 mb-1">{link.title}</h3>
              <p className="text-sm text-slate-500">{link.description}</p>
            </button>
          );
        })}
      </div>

      {/* FAQ Section */}
      <div className="grid grid-cols-4 gap-6">
        {/* Category Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 h-fit">
          <h3 className="font-semibold text-slate-800 mb-4">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors text-sm ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ List */}
        <div className="col-span-3 space-y-4">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              Frequently Asked Questions
            </h2>
            
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-12">
                <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500">No results found. Try different keywords.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredFaqs.map((faq) => (
                  <div
                    key={faq.id}
                    className="border border-slate-200 rounded-lg overflow-hidden hover:border-blue-300 transition-colors"
                  >
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                      className="w-full px-6 py-4 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                          {faq.category}
                        </span>
                        <span className="font-medium text-slate-800 text-left">{faq.question}</span>
                      </div>
                      {expandedFaq === faq.id ? (
                        <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                      )}
                    </button>
                    {expandedFaq === faq.id && (
                      <div className="px-6 py-4 bg-white border-t border-slate-200">
                        <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact Support */}
      <div className="mt-8 bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-8 shadow-sm border border-slate-200">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Still need help?</h2>
          <p className="text-slate-600">Our support team is here to assist you</p>
        </div>
        
        <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
          <button className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-slate-800">Email Support</h3>
                <p className="text-sm text-slate-500">support@typingcoachml.com</p>
              </div>
            </div>
          </button>
          
          <button className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Phone className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-slate-800">Phone Support</h3>
                <p className="text-sm text-slate-500">+62 21 1234 5678</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
