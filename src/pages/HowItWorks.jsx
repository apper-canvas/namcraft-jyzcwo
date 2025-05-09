import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import getIcon from '../utils/iconUtils';
const HowItWorks = () => {
  // Icon components
  const WandIcon = getIcon('Wand');
  const ArrowLeftIcon = getIcon('ArrowLeft');
  const BrainIcon = getIcon('Brain');
  const SeedIcon = getIcon('Sprout');
  const ClockIcon = getIcon('Clock');
  const DatabaseIcon = getIcon('Database');
  const LayersIcon = getIcon('Layers');
  const RefreshCwIcon = getIcon('RefreshCw');
  const TagIcon = getIcon('Tag');
  const SearchIcon = getIcon('Search');

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="min-h-screen">
      <header className="bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary-dark/10 dark:to-secondary-dark/10">
        <div className="container mx-auto px-4 py-8 md:py-16">
          <Link 
            to="/" 
            className="inline-flex items-center text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light mb-6 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Generator
          </Link>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h4 className="text-lg font-medium flex items-center mt-6 mb-3">
              <SeedIcon className="h-5 w-5 mr-2 text-secondary" /> Seeded Generation
            </h4>
            <p className="mb-4">We use a technique called <span className="font-medium">seeded random generation</span> to create app names. Here's how it works:</p>
            
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Each name generation session uses a unique "seed" value based on the current timestamp</li>
              <li>This seed ensures that the same input and seed will always produce the same set of names</li>
              <li>You can regenerate with the same seed to get variations on your current results</li>
              <li>Or generate with a new seed for completely different naming patterns</li>
            </ul>
            
            <h4 className="text-lg font-medium flex items-center mt-6 mb-3">
              <ClockIcon className="h-5 w-5 mr-2 text-secondary" /> Timestamp Integration
            </h4>
            <p className="mb-4">The timestamp when you request name generation becomes part of the process:</p>
            
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>The exact millisecond of your request creates a unique seed value</li>
              <li>This ensures no two generation sessions are identical (unless using the same seed)</li>
              <li>Each generated name records its creation timestamp, allowing you to track when it was created</li>
            </ul>
            
            <div className="flex items-center justify-center mb-4">
              <WandIcon className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">How NamCraft Works</h1>
            <p className="text-surface-600 dark:text-surface-300 text-lg md:text-xl max-w-3xl mx-auto">
              Discover the magic behind our app name generation algorithm and how we create the perfect name for your project.
              <li><span className="font-medium">Deterministic Generation:</span> Uses the timestamp-based seed to ensure reproducible results.</li>
            </p>
          </motion.div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <motion.section 
            className="mb-16"
            {...fadeIn}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
          
          <div className="mt-8 text-center">
              <Link to="/" className="inline-flex items-center text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light transition-colors">
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                Try it yourself
              </Link>
          </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center">
              <BrainIcon className="h-7 w-7 mr-2 text-primary" />
              The Naming Philosophy
            </h2>
            <div className="card">
              <p className="mb-4">
                Great app names are more than random words—they're carefully crafted identifiers that convey the essence of your application while being memorable and distinctive.
              </p>
              <p>
                Our name generation system follows these key principles:
              </p>
              <ul className="list-disc pl-5 mt-4 space-y-2">
                <li>Relevance to your app's purpose and audience</li>
                <li>Memorability and pronounceability</li>
                <li>Domain availability potential</li>
                <li>Brand potential and distinctiveness</li>
                <li>Emotional resonance with users</li>
              </ul>
            </div>
          </motion.section>

          <motion.section 
            className="mb-16"
            {...fadeIn}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center">
              <LayersIcon className="h-7 w-7 mr-2 text-primary" />
              The Generation Process
            </h2>
            <div className="card">
              <ol className="relative border-l border-surface-300 dark:border-surface-700 ml-3 space-y-6 py-2">
                <li className="ml-6">
                  <span className="absolute flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full -left-4">1</span>
                  <h3 className="font-semibold text-xl mb-1">Natural Language Analysis</h3>
                  <p className="text-surface-600 dark:text-surface-300">
                    Your text description is analyzed to identify key concepts, purpose, and emotional tone. We extract important keywords and understand the context of your application.
                  </p>
                </li>
                <li className="ml-6">
                  <span className="absolute flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full -left-4">2</span>
                  <h3 className="font-semibold text-xl mb-1">Semantic Mapping</h3>
                  <p className="text-surface-600 dark:text-surface-300">
                    We map your keywords to our database of root words, prefixes, and suffixes that align with technology and product naming conventions.
                  </p>
                </li>
                <li className="ml-6">
                  <span className="absolute flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full -left-4">3</span>
                  <h3 className="font-semibold text-xl mb-1">Pattern Application</h3>
                  <p className="text-surface-600 dark:text-surface-300">
                    Our algorithm applies various naming patterns such as compound words, portmanteaus, modified spellings, and metaphorical associations.
                  </p>
                </li>
                <li className="ml-6">
                  <span className="absolute flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full -left-4">4</span>
                  <h3 className="font-semibold text-xl mb-1">Filtering & Refinement</h3>
                  <p className="text-surface-600 dark:text-surface-300">
                    Generated names are filtered for pronounceability, uniqueness, and brand potential. Names that are too similar to existing products are eliminated.
                  </p>
                </li>
              </ol>
            </div>
          </motion.section>

          <motion.section 
            className="mb-16"
            {...fadeIn}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center">
              <DatabaseIcon className="h-7 w-7 mr-2 text-primary" />
              Naming Patterns & Techniques
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card">
                <div className="flex items-center mb-3">
                  <TagIcon className="h-5 w-5 mr-2 text-primary" />
                  <h3 className="font-semibold text-lg">Compound Words</h3>
                </div>
                <p className="text-surface-600 dark:text-surface-300">
                  Combining two relevant words (FaceBook, YouTube, DropBox)
                </p>
                <div className="mt-3 p-2 bg-surface-100 dark:bg-surface-700 rounded-lg text-sm">
                  <span className="font-semibold">Example:</span> If you describe a "document signing app," we might generate "SignDoc" or "DocuSign"
                </div>
              </div>

              <div className="card">
                <div className="flex items-center mb-3">
                  <TagIcon className="h-5 w-5 mr-2 text-primary" />
                  <h3 className="font-semibold text-lg">Modified Spellings</h3>
                </div>
                <p className="text-surface-600 dark:text-surface-300">
                  Altering spelling to create unique, ownable words (Lyft, Flickr, Tumblr)
                </p>
                <div className="mt-3 p-2 bg-surface-100 dark:bg-surface-700 rounded-lg text-sm">
                  <span className="font-semibold">Example:</span> A photo editing app might become "Pikture" or "Fotofix"
                </div>
              </div>

              <div className="card">
                <div className="flex items-center mb-3">
                  <TagIcon className="h-5 w-5 mr-2 text-primary" />
                  <h3 className="font-semibold text-lg">Portmanteaus</h3>
                </div>
                <p className="text-surface-600 dark:text-surface-300">
                  Blending parts of multiple words (Instagram = Instant + Telegram)
                </p>
                <div className="mt-3 p-2 bg-surface-100 dark:bg-surface-700 rounded-lg text-sm">
                  <span className="font-semibold">Example:</span> A meditation timer app might become "MediTime" or "ZenClock"
                </div>
              </div>

              <div className="card">
                <div className="flex items-center mb-3">
                  <TagIcon className="h-5 w-5 mr-2 text-primary" />
                  <h3 className="font-semibold text-lg">Metaphorical Names</h3>
                </div>
                <p className="text-surface-600 dark:text-surface-300">
                  Using symbolism and metaphors (Apple, Amazon, Oracle)
                </p>
                <div className="mt-3 p-2 bg-surface-100 dark:bg-surface-700 rounded-lg text-sm">
                  <span className="font-semibold">Example:</span> A cloud storage service might become "Vault" or "Nimbus"
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section 
            className="mb-12"
            {...fadeIn}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center">
              <RefreshCwIcon className="h-7 w-7 mr-2 text-primary" />
              Regeneration & Refinement
            </h2>
            <div className="card">
              <p className="mb-4">
                Not seeing the perfect name? Our regeneration feature uses varied techniques with each iteration:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Adjusts word combinations and patterns</li>
                <li>Explores different semantic fields related to your description</li>
                <li>Varies name length and complexity</li>
                <li>Applies different linguistic stylistic approaches</li>
              </ul>
              <div className="mt-6 p-4 bg-surface-100 dark:bg-surface-700 rounded-xl">
                <div className="flex items-center mb-2">
                  <SearchIcon className="h-5 w-5 mr-2 text-primary" />
                  <h3 className="font-semibold">Pro Tip</h3>
                </div>
                <p className="text-surface-600 dark:text-surface-300 text-sm">
                  Try adding different descriptive words or focusing on specific aspects of your app to get more varied name suggestions. The more specific your description, the more tailored the results!
                </p>
              </div>
            </div>
          </motion.section>

          <motion.div 
            className="text-center mt-16"
            {...fadeIn}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Link to="/" className="btn btn-primary inline-flex items-center">
              <WandIcon className="h-5 w-5 mr-2" />
              Try the Name Generator
            </Link>
          </motion.div>
        </div>
      </main>

      <footer className="container mx-auto px-4 py-8 md:py-12 border-t border-surface-200 dark:border-surface-800">
        <div className="text-center text-surface-500 dark:text-surface-400 text-sm">
          <p>© {new Date().getFullYear()} NamCraft. All rights reserved.</p>
          <p className="mt-2">Crafted with ♥ for developers and creators.</p>
        </div>
      </footer>
    </div>
  );
};

export default HowItWorks;