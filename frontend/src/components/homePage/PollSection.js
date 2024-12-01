import React, { useState } from 'react';
import { Card, CardContent, Typography, RadioGroup, FormControlLabel, Radio, Button, LinearProgress, CircularProgress } from '@mui/material';

const PollSection = () => {
  const [pollOptions, setPollOptions] = useState([
    { option: 'New Course', votes: 0 },
    { option: 'Online Library', votes: 0 },
    { option: 'Research Seminars', votes: 0 },
  ]);
  const [selectedOption, setSelectedOption] = useState('');
  const [isVoted, setIsVoted] = useState(false);
  const [votingInProgress, setVotingInProgress] = useState(false);

  const handleVote = () => {
    if (!selectedOption) {
      alert("Please select an option before voting");
      return;
    }

    // Simulate voting process
    setVotingInProgress(true);

    setTimeout(() => {
      // Update votes dynamically
      setPollOptions((prevState) =>
        prevState.map((option) =>
          option.option === selectedOption
            ? { ...option, votes: option.votes + 1 }
            : option
        )
      );
      setIsVoted(true);
      setVotingInProgress(false);
    }, 1000);
  };

  const totalVotes = pollOptions.reduce((sum, option) => sum + option.votes, 0);

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <Typography variant="h4" align="center" gutterBottom>
          Poll: What feature would you like to see next?
        </Typography>
        <div className="space-y-4">
          <Card className="shadow-lg">
            <CardContent>
              <RadioGroup
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="space-y-2"
              >
                {pollOptions.map((option, index) => (
                  <FormControlLabel
                    key={index}
                    value={option.option}
                    control={<Radio />}
                    label={option.option}
                  />
                ))}
              </RadioGroup>
              <div className="flex justify-center mt-4">
                {votingInProgress ? (
                  <CircularProgress />
                ) : (
                  <Button
                    onClick={handleVote}
                    variant="contained"
                    color="primary"
                    className="w-full"
                  >
                    Vote
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {isVoted && (
            <div className="mt-8">
              <Typography variant="h6" align="center" gutterBottom>
                Poll Results
              </Typography>
              {pollOptions.map((option, index) => (
                <div key={index} className="mb-4">
                  <Typography variant="body1" className="font-semibold">
                    {option.option}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={(option.votes / totalVotes) * 100}
                    color="primary"
                  />
                  <Typography variant="body2" align="center">
                    {option.votes} Votes
                  </Typography>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PollSection;