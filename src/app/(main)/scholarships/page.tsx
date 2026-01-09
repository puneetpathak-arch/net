
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { scholarships as allScholarships } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight, GraduationCap, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from '@/lib/utils';
import type { Scholarship } from '@/lib/types';

const states = Array.from(new Set(allScholarships.flatMap(s => s.eligibility.state).filter(Boolean)));
const categories = Array.from(new Set(allScholarships.flatMap(s => s.eligibility.category).filter(Boolean)));

export default function ScholarshipsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const filteredScholarships = useMemo(() => {
    return allScholarships.filter(scholarship => {
      const searchMatch = scholarship.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          scholarship.provider.toLowerCase().includes(searchQuery.toLowerCase());
      
      const stateMatch = selectedStates.length === 0 || 
                         scholarship.eligibility.state?.some(s => selectedStates.includes(s!));

      const categoryMatch = selectedCategories.length === 0 ||
                            scholarship.eligibility.category?.some(c => selectedCategories.includes(c!));

      return searchMatch && stateMatch && categoryMatch;
    });
  }, [searchQuery, selectedStates, selectedCategories]);

  const toggleFilter = (filterList: string[], setFilterList: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
    if (filterList.includes(value)) {
      setFilterList(filterList.filter(item => item !== value));
    } else {
      setFilterList([...filterList, value]);
    }
  };

  const hasActiveFilters = selectedStates.length > 0 || selectedCategories.length > 0 || searchQuery.length > 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <GraduationCap className="w-7 h-7 md:w-8 md:h-8"/>
            Scholarships & Opportunities 🎓
        </h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Find financial aid for your education.
        </p>
      </div>

      <Card>
        <CardHeader className='space-y-4'>
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
                placeholder="Search by name or provider..." 
                className="pl-10 focus:w-full transition-all duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div>
            <p className="text-sm font-medium mb-2 text-muted-foreground">Filter by State</p>
            <div className="flex flex-wrap gap-2">
              {states.map(state => (
                <Button 
                  key={state}
                  variant={selectedStates.includes(state!) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => toggleFilter(selectedStates, setSelectedStates, state!)}
                  className="transition-all duration-200"
                >
                  {state}
                </Button>
              ))}
            </div>
          </div>
           <div>
            <p className="text-sm font-medium mb-2 text-muted-foreground">Filter by Category</p>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button 
                  key={category}
                   variant={selectedCategories.includes(category!) ? 'default' : 'outline'}
                   size="sm"
                  onClick={() => toggleFilter(selectedCategories, setSelectedCategories, category!)}
                   className="transition-all duration-200"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={() => {
              setSelectedStates([]);
              setSelectedCategories([]);
              setSearchQuery('');
            }}>Clear All Filters</Button>
          )}
        </CardHeader>
      </Card>
      
      {filteredScholarships.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredScholarships.map((scholarship, index) => (
            <Card key={scholarship.id} className="flex flex-col animate-fade-in-up hover:animate-lift" style={{ animationDelay: `${index * 50}ms` }}>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">{scholarship.name}</CardTitle>
                <CardDescription>{scholarship.provider}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Amount</span>
                  <span className="font-semibold text-sm">{scholarship.amount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Deadline</span>
                  <span className="font-semibold text-sm">{scholarship.deadline}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {scholarship.eligibility.state?.map(s => <Badge key={s} variant="secondary">{s}</Badge>)}
                  {scholarship.eligibility.category?.map(c => <Badge key={c} variant="secondary">{c}</Badge>)}
                  {scholarship.eligibility.income && <Badge variant="secondary">Income: {scholarship.eligibility.income}</Badge>}
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="default" className="w-full">
                  <Link href={scholarship.link} target="_blank">
                    Apply Now <ArrowUpRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
         <Card>
            <CardContent className="p-8 text-center text-muted-foreground space-y-4">
                <Search className="w-12 h-12 md:w-16 md:h-16 mx-auto text-gray-300" />
                <h3 className="text-base md:text-lg font-semibold text-foreground">No scholarships found</h3>
                <p className="text-sm">Try adjusting your filters or clearing your search.</p>
                {hasActiveFilters && (
                    <Button variant="default" onClick={() => {
                        setSelectedStates([]);
                        setSelectedCategories([]);
                        setSearchQuery('');
                    }}>Clear All Filters</Button>
                )}
            </CardContent>
        </Card>
      )}
    </div>
  );
}
