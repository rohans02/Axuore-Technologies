"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function Contact() {
  const initialFormData = {
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to toggle form dialog visibility

  const handleChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        // Show the result as an alert
        alert(result.message || "Form submitted successfully!");
        setFormData(initialFormData); // Reset form data after successful submission
      } else {
        alert(
          result.message || "Failed to send the message. Please try again."
        );
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send the message. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-purple-500/10 backdrop-blur-lg rounded-lg shadow-sm text-center border-purple-500 border-[1px]">
      <h2 className="text-4xl font-semibold text-purple-500 mb-6 text-center">
        Service Inquiry
      </h2>

      {/* Description */}
      <p className="text-lg sm:text-xl text-gray-200 leading-relaxed">
        Fill out our Service Inquiry form to explore how Axuore Technologies can
        transform your business with cutting-edge IT solutions, web development,
        digital marketing, and more. We’ll work with you to understand your
        needs and provide tailored recommendations to drive your success.
      </p>

      {/* Button to toggle form dialog visibility */}
      <div className="flex justify-center my-6">
        <Button
          onClick={() => setIsDialogOpen(true)} // Open the dialog when button is clicked
          className="bg-purple-500 hover:bg-purple-600 text-white"
        >
          Fill Out the Form
        </Button>
      </div>

      {/* Dialog to display the form */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="p-6 space-y-6 rounded-lg shadow-lg bg-gray-200">
          <DialogHeader>
            <DialogTitle className="text-blue-500">
              Service Inquiry Form
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Please provide your details and inquiry message.
            </DialogDescription>
          </DialogHeader>

          {/* Form inside the dialog */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-black">
                Full Name
              </Label>
              <Input
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                className="border-gray-200"
              />
            </div>

            {/* Email & Phone Fields */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-black">
                  Email Address
                </Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border-gray-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-black">
                  Phone Number
                </Label>
                <Input
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="border-gray-200"
                />
              </div>
            </div>

            {/* Service Selection */}
            <div className="space-y-2">
              <Label className="text-black">Select a Service</Label>
              <Select
                value={formData.service}
                onValueChange={(value) =>
                  setFormData({ ...formData, service: value })
                }
              >
                <SelectTrigger className="border-gray-200">
                  <SelectValue placeholder="Choose a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Web Development">
                    Web Development
                  </SelectItem>
                  <SelectItem value="Mobile App Development">
                    Mobile App Development
                  </SelectItem>
                  <SelectItem value="UI/UX Design">UI/UX Design</SelectItem>
                  <SelectItem value="Cloud Computing">
                    Cloud Computing
                  </SelectItem>
                  <SelectItem value="IT Consulting">IT Consulting</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Message Field */}
            <div className="space-y-2">
              <Label htmlFor="message" className="text-black">
                Project Details/Message
              </Label>
              <Textarea
                name="message"
                placeholder="Enter project details or message"
                value={formData.message}
                onChange={handleChange}
                className="border-gray-200 min-h-[120px]"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center pt-4">
              <Button
                type="reset"
                variant="ghost"
                className="text-black hover:bg-gray-300"
                onClick={() => setFormData(initialFormData)}
              >
                Reset
              </Button>
              <Button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-8"
              >
                Submit
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
