import { useState, Fragment } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

// Step 1: TypeScript Interface
export interface SessionFeaturePreviewDto {
  id: string;
  userName: string;
  wpm: number;
  weakestFinger: string;
  accuracy: number;
  rawTextTyped: string;
  dwellLeftPinky: number;
  flightLeftPinky: number;
}

interface ExpandableSessionTableProps {
  pendingSessions: SessionFeaturePreviewDto[];
}

export function ExpandableSessionTable({
  pendingSessions,
}: ExpandableSessionTableProps) {
  // Step 2: Component Logic - Track expanded rows
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  // Toggle function to expand/collapse rows
  const toggleRow = (id: string) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const isExpanded = (id: string) => expandedRows.has(id);

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 hover:bg-gray-50">
            <TableHead className="w-12"></TableHead>
            <TableHead className="font-semibold">Session ID</TableHead>
            <TableHead className="font-semibold">WPM</TableHead>
            <TableHead className="font-semibold">Weakest Finger</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Step 3: HTML Template - Iterate over sessions */}
          {pendingSessions.map((session) => (
            <Fragment key={session.id}>
              {/* Master Row (Summary) */}
              <TableRow
                className="hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => toggleRow(session.id)}
              >
                <TableCell>
                  <button
                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleRow(session.id);
                    }}
                  >
                    {isExpanded(session.id) ? (
                      <ChevronDown className="w-5 h-5 text-gray-600 transition-transform" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-600 transition-transform" />
                    )}
                  </button>
                </TableCell>
                <TableCell className="font-medium text-blue-600">
                  {session.id.substring(0, 8)}...
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="font-mono">
                    {session.wpm} WPM
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-gray-700">{session.weakestFinger}</span>
                </TableCell>
              </TableRow>

              {/* Detail Row (Expanded Content) */}
              {isExpanded(session.id) && (
                <TableRow key={`${session.id}-detail`}>
                  <TableCell colSpan={4} className="bg-gray-50 p-0">
                    <div className="p-6">
                      <Card className="border-none shadow-sm bg-white">
                        <CardContent className="p-6">
                          {/* Top Section - User Info */}
                          <div className="mb-6">
                            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                              User Information
                            </h4>
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-medium text-gray-900">
                                {session.userName}
                              </span>
                              <Badge className="bg-green-100 text-green-800">
                                Active
                              </Badge>
                            </div>
                          </div>

                          {/* Middle Section - Raw Text Typed */}
                          <div className="mb-6">
                            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                              Raw Text Typed
                            </h4>
                            <blockquote className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded-r text-gray-700 italic">
                              "{session.rawTextTyped}"
                            </blockquote>
                          </div>

                          {/* Bottom Section - Detailed Metrics Grid */}
                          <div>
                            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                              Detailed Metrics
                            </h4>
                            <div className="grid grid-cols-3 gap-4">
                              {/* Accuracy */}
                              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                                <div className="text-xs font-medium text-blue-600 uppercase tracking-wide mb-1">
                                  Accuracy
                                </div>
                                <div className="text-2xl font-bold text-blue-900">
                                  {session.accuracy}%
                                </div>
                              </div>

                              {/* Dwell Left Pinky */}
                              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                                <div className="text-xs font-medium text-purple-600 uppercase tracking-wide mb-1">
                                  Dwell Left Pinky
                                </div>
                                <div className="text-2xl font-bold text-purple-900">
                                  {session.dwellLeftPinky}ms
                                </div>
                              </div>

                              {/* Flight Left Pinky */}
                              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                                <div className="text-xs font-medium text-green-600 uppercase tracking-wide mb-1">
                                  Flight Left Pinky
                                </div>
                                <div className="text-2xl font-bold text-green-900">
                                  {session.flightLeftPinky}ms
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Additional Session Details */}
                          <div className="mt-6 pt-6 border-t border-gray-200">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">
                                  Full Session ID:
                                </span>
                                <span className="font-mono text-gray-900 text-xs">
                                  {session.id}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Status:</span>
                                <Badge variant="outline" className="text-xs">
                                  Pending Analysis
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </Fragment>
          ))}
        </TableBody>
      </Table>

      {pendingSessions.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No pending sessions found</p>
          <p className="text-sm mt-2">
            Sessions will appear here when new typing data is available
          </p>
        </div>
      )}
    </div>
  );
}
